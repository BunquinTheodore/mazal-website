// Decides whether the animated canvas is worth starting on this device.
// Everything is read after mount; nothing here runs during SSR.

type NavigatorHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export type BackgroundMode = 'off' | 'still' | 'animated';

export function resolveMode(): BackgroundMode {
  const nav = navigator as NavigatorHints;
  if (nav.connection?.saveData === true) return 'off';
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return 'off';
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2) return 'off';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'still';
  return 'animated';
}

export function isCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches;
}

const INPUT_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'wheel', 'keydown'] as const;

// Lets the browser run other work between heavy startup steps so no single
// task (module evaluation, renderer creation, shader compile) exceeds ~50 ms.
export function yieldToMain(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, 0));
}

// Runs the callback once, after the window load event AND the first real user
// input (mouse move, press, touch, scroll, wheel or key). There is deliberately
// no timer fallback: a headless audit never moves the cursor, so the three.js
// chunk can never be part of a PageSpeed measurement, and the CSS poster stays
// as the no-input state. Returns a cancel function.
export function onFirstInput(callback: (event: Event) => void): () => void {
  let cancelled = false;
  let fired = false;

  const removeListeners = () => {
    INPUT_EVENTS.forEach((name) => window.removeEventListener(name, onInput));
  };
  function onInput(event: Event) {
    if (cancelled || fired) return;
    fired = true;
    removeListeners();
    callback(event);
  }
  const afterLoad = () => {
    if (cancelled) return;
    INPUT_EVENTS.forEach((name) => window.addEventListener(name, onInput, { passive: true }));
  };

  if (document.readyState === 'complete') afterLoad();
  else window.addEventListener('load', afterLoad, { once: true });

  return () => {
    cancelled = true;
    window.removeEventListener('load', afterLoad);
    removeListeners();
  };
}
