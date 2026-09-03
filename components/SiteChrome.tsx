'use client';

import { useEffect, useRef, useState } from 'react';

export default function SiteChrome() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [entered, setEntered] = useState<boolean | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setEntered(sessionStorage.getItem('mazal-entered') === '1');
    setMuted(localStorage.getItem('mazal-muted') === '1');
  }, []);

  useEffect(() => {
    if (entered && audioRef.current) {
      audioRef.current.muted = muted;
      audioRef.current.play().catch(() => {});
    }
  }, [entered]);

  const handleEnter = () => {
    sessionStorage.setItem('mazal-entered', '1');
    setEntered(true);
    const el = audioRef.current;
    if (el) {
      el.muted = false;
      el.volume = 0.45;
      el.play().catch(() => {});
    }
    setMuted(false);
    localStorage.setItem('mazal-muted', '0');
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    localStorage.setItem('mazal-muted', next ? '1' : '0');
    if (audioRef.current) audioRef.current.muted = next;
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/theme.mp3" loop preload="auto" />

      {entered === false && (
        <div className="intro-gate">
          <div className="intro-content">
            <img src="/assets/images/asset-006.png" alt="MAZAL logo" />
            <span className="eyebrow">Mazal Community &nbsp;&middot;&nbsp; Good Fortune</span>
            <h1>MAZAL</h1>
            <p className="sub">Where all communities unite and grow. Tap in for the full experience, sound on.</p>
            <button className="btn" onClick={handleEnter}>Enter the community</button>
            <p className="intro-hint">Turns on background music</p>
          </div>
        </div>
      )}

      {entered && (
        <button
          className={`sound-toggle${muted ? ' muted' : ''}`}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          aria-pressed={muted}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 9v6h4l5 4V5L8 9H4z" />
              <path d="M17 9l4 4M21 9l-4 4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 9v6h4l5 4V5L8 9H4z" />
              <path d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
