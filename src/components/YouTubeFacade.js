'use client';

import { useState } from 'react';

// Click-to-load YouTube embed: only a thumbnail and a button ship with the
// page. The iframe (from youtube-nocookie.com) mounts after the click, so no
// YouTube script, iframe or cookie loads until the visitor asks for it.
export default function YouTubeFacade({ id, title }) {
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
          {/* eslint-disable-next-line @next/next/no-img-element -- external thumbnail, lazy, fixed 16:9 box */}
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            width="1280"
            height="720"
            loading="lazy"
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
