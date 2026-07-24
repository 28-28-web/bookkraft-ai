import { createClient } from '@/lib/supabase/server';
import { getJobWithChunks } from '@/lib/ai/jobs';

const POLL_MS = 1000;
const TERMINAL = new Set(['done', 'failed', 'partial']);

// SSE reads job + chunk state FROM THE DATABASE on every tick — nothing is
// held only in the connection. A client can disconnect and reconnect to the
// same jobId at any point and pick up exactly where it left off, because the
// state it's resuming from lives in the jobs/job_chunks tables, not in this
// process's memory.
export async function GET(request, { params }) {
    const { id } = await params;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return new Response('unauthorized', { status: 401 });
    }

    const encoder = new TextEncoder();
    let closed = false;
    const seenDoneChunkIndexes = new Set();

    const stream = new ReadableStream({
        async start(controller) {
            const send = (event, data) => {
                if (closed) return;
                controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
            };

            const tick = async () => {
                if (closed) return;

                let snapshot;
                try {
                    snapshot = await getJobWithChunks(id, user.id);
                } catch (err) {
                    send('error', { message: 'lookup_failed' });
                    return;
                }

                if (!snapshot) {
                    send('error', { message: 'not_found' });
                    closed = true;
                    controller.close();
                    return;
                }

                const { job, chunks } = snapshot;

                for (const chunk of chunks) {
                    if (chunk.status === 'done' && !seenDoneChunkIndexes.has(chunk.chunk_index)) {
                        seenDoneChunkIndexes.add(chunk.chunk_index);
                        send('chunk_done', { chunkIndex: chunk.chunk_index });
                    }
                    if (chunk.status === 'failed' && !seenDoneChunkIndexes.has(chunk.chunk_index)) {
                        seenDoneChunkIndexes.add(chunk.chunk_index);
                        send('chunk_failed', { chunkIndex: chunk.chunk_index, error: chunk.error });
                    }
                }

                send('progress', {
                    status: job.status,
                    totalChunks: job.total_chunks,
                    completedChunks: job.completed_chunks,
                });

                if (TERMINAL.has(job.status)) {
                    send('job_done', {
                        status: job.status,
                        creditsCharged: job.credits_charged,
                        creditsReserved: job.credits_reserved,
                        result: job.input_meta?.result || null,
                        error: job.error || null,
                    });
                    closed = true;
                    controller.close();
                    return;
                }

                setTimeout(tick, POLL_MS);
            };

            tick();
        },
        cancel() {
            closed = true;
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
        },
    });
}
