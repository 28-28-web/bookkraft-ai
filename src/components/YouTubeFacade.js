'use client';

import { useState } from 'react';

// Click-to-load YouTube embed: only a thumbnail and a button ship with the
// page. The iframe (from youtube-nocookie.com) mounts after the click, so no
// YouTube script, iframe or cookie loads until the visitor asks for it.
//
// thumb/thumbSrcSet/thumbSizes: optional self-hosted thumbnail (default is
// YouTube's maxresdefault). priority: set when the video sits in the first
// screen, so the thumbnail loads eagerly at high priority instead of lazily.
export default function YouTubeFacade({ id, title, thumb, thumbSrcSet, thumbSizes, priority = false }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-facade">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized thumbnails in a fixed 16:9 box */}
          <img
            src={thumb ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            srcSet={thumbSrcSet}
            sizes={thumbSizes}
            alt=""
            width="1280"
            height="720"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            decoding="async"
          />
          <span className="video-facade-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </div>
  );
}
