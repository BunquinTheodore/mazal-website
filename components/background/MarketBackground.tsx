'use client';

import { useEffect, useRef } from 'react';
import { onFirstInput, resolveMode, yieldToMain } from './capabilities';
import type { PointerStart } from './pointerTrail';

// The triggering input may itself carry a pointer position: keep it so the glow
// is already under the cursor or finger when the canvas fades in.
function startFromEvent(event: Event): PointerStart | undefined {
  if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
    const touch = event.touches[0];
    return touch ? { x: touch.clientX, y: touch.clientY, touch: true } : undefined;
  }
  if (event instanceof PointerEvent) {
    return { x: event.clientX, y: event.clientY, touch: event.pointerType === 'touch' };
  }
  return undefined;
}

// Mounted once in the root layout. The server and first client render are the
// same empty poster div; the canvas is added imperatively, and the three.js
// chunk is only requested after the first real user input (never on a timer).
export default function MarketBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let dispose: (() => void) | null = null;
    let cancelled = false;

    const cancelWait = onFirstInput((event) => {
      const mode = resolveMode();
      if (mode === 'off') return;
      const start = startFromEvent(event);
      import('./marketScene')
        .then(async ({ createMarketScene }) => {
          await yieldToMain();
          if (cancelled) return;
          const scene = await createMarketScene(host, mode, start);
          if (cancelled) {
            scene?.dispose();
            return;
          }
          dispose = scene ? scene.dispose : null;
        })
        .catch(() => {
          // Chunk failed to load: the static poster stays, which is the fallback.
        });
    });

    return () => {
      cancelled = true;
      cancelWait();
      dispose?.();
    };
  }, []);

  return <div ref={hostRef} className="mkt-bg" aria-hidden="true" />;
}
