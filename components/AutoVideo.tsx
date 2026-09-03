'use client';

import { useEffect, useRef, useState, VideoHTMLAttributes } from 'react';

export default function AutoVideo({
  className = '',
  style,
  ...rest
}: VideoHTMLAttributes<HTMLVideoElement> & { className?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPlay = () => window.dispatchEvent(new Event('mazal:video-play'));
    const onStop = () => window.dispatchEvent(new Event('mazal:video-stop'));
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onStop);
    el.addEventListener('ended', onStop);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().then(() => setPlaying(true)).catch(() => {});
          } else {
            el.pause();
            setPlaying(false);
          }
        });
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onStop);
      el.removeEventListener('ended', onStop);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="metadata"
      data-playing={playing}
      {...rest}
    />
  );
}
