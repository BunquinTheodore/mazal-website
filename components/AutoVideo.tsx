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
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      muted
      loop
      playsInline
      preload="none"
      data-playing={playing}
      {...rest}
    />
  );
}
