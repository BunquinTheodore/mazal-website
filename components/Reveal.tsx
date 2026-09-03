'use client';

import { useEffect, useRef, ReactNode, ElementType } from 'react';

export default function Reveal({
  as: Tag = 'div',
  className = '',
  activeClass = 'in',
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  activeClass?: string;
  children: ReactNode;
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [activeClass]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
