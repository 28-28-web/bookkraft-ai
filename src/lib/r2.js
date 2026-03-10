// BookKraft AI v8.0 — Cloudflare R2 Client (Part F5)
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const r2 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const BUCKET = process.env.R2_BUCKET_NAME || 'bookkraftai-assets';

// Upload a file/buffer to R2
export async function uploadToR2(body, key, contentType = 'application/octet-stream') {
    await r2.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
    }));
    return key;
}

// Get a signed download URL (default 1hr expiry)
export async function getSignedDownloadUrl(key, expiresIn = 3600) {
    const url = await getSignedUrl(r2, new GetObjectCommand({
        Bucket: BUCKET,
        Key: key,
    }), { expiresIn });
    return url;
}

// Delete a single object
export async function deleteFromR2(key) {
    await r2.send(new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
    }));
}

// List objects with a prefix (for cleanup cron)
export async function listR2Objects(prefix) {
    const result = await r2.send(new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
    }));
    return result.Contents || [];
}

// R2 Key conventions:
// projects/{userId}/{timestamp}/original.docx   — 24h TTL
// sessions/{userId}/{toolSlug}/{timestamp}.txt   — 24h TTL
// epubs/{userId}/{timestamp}/{title}.epub        — 7-day TTL, signed URL 1hr
// backups/db/{date}.sql                          — 30-day retention
// backups/config/{date}.zip                      — 30-day retention
