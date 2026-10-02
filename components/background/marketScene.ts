import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Camera,
  Color,
  LineSegments,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { isCoarsePointer, yieldToMain, type BackgroundMode } from './capabilities';
import { PointerTrail, type PointerStart } from './pointerTrail';
import { LINE_FRAGMENT, LINE_VERTEX, NODE_FRAGMENT, NODE_VERTEX } from './marketShaders';

export type MarketScene = { dispose: () => void };

const FALLBACK_GREEN = '#C0F030';
const FALLBACK_BLUE = '#0128A9';
// Frame caps: while the pointer is active (moving, or a finger down) desktop
// draws at 45 fps and touch at 30 fps; otherwise 12 fps keeps the slow drift
// alive. With no input for IDLE_PAUSE_MS the loop stops until the next input.
const ACTIVE_FRAME_MS = 1000 / 45;
const ACTIVE_TOUCH_FRAME_MS = 1000 / 30;
const IDLE_FRAME_MS = 1000 / 12;
const IDLE_PAUSE_MS = 20000;
const FRAME_TOLERANCE_MS = 0.5;
const STILL_FRAME_TIME_S = 11;
const HEIGHT_JITTER_PX = 160;

function readToken(name: string, fallback: string): Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  try {
    return new Color(raw || fallback);
  } catch {
    return new Color(fallback);
  }
}

function lineSeed(index: number): number {
  return index * 0.173 + 0.11;
}

// Each segment is a pair of vertices: x = position along the line (0..1),
// y = line index, z = per-line seed. The shader turns these into chart points.
function buildLines(lineCount: number, segments: number): BufferGeometry {
  const positions = new Float32Array(lineCount * segments * 6);
  let cursor = 0;
  for (let line = 0; line < lineCount; line += 1) {
    const seed = lineSeed(line);
    for (let s = 0; s < segments; s += 1) {
      positions.set([s / segments, line, seed, (s + 1) / segments, line, seed], cursor);
      cursor += 6;
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  return geometry;
}

function buildNodes(lineCount: number, nodeCount: number): BufferGeometry {
  const positions = new Float32Array(nodeCount * 3);
  for (let n = 0; n < nodeCount; n += 1) {
    const line = (n * 5 + 2) % lineCount;
    positions.set([(n * 0.382) % 1, line, lineSeed(line)], n * 3);
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  return geometry;
}

export async function createMarketScene(
  container: HTMLElement, mode: BackgroundMode,
  initialPointer?: PointerStart,
): Promise<MarketScene | null> {
  const coarse = isCoarsePointer();
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
  } catch {
    return null;
  }

  await yieldToMain();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = false;
  const canvas = renderer.domElement;
  container.appendChild(canvas);

  const lineCount = coarse ? 6 : 9;
  const trail = new PointerTrail();
  const uniforms = {
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uLines: { value: lineCount },
    uTrail: { value: trail.uniform },
    uColA: { value: readToken('--green', FALLBACK_GREEN) },
    uColB: { value: readToken('--blue', FALLBACK_BLUE) },
    uAlpha: { value: coarse ? 0.3 : 0.34 },
    uPixelRatio: { value: pixelRatio },
  };
  const materialOptions = {
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: AdditiveBlending,
  };
  const lineMaterial = new ShaderMaterial({ ...materialOptions, vertexShader: LINE_VERTEX, fragmentShader: LINE_FRAGMENT });
  const nodeMaterial = new ShaderMaterial({ ...materialOptions, vertexShader: NODE_VERTEX, fragmentShader: NODE_FRAGMENT });
  const lineGeometry = buildLines(lineCount, coarse ? 72 : 120);
  const nodeGeometry = buildNodes(lineCount, coarse ? 8 : 12);
  const lines = new LineSegments(lineGeometry, lineMaterial);
  const nodes = new Points(nodeGeometry, nodeMaterial);
  lines.frustumCulled = false;
  nodes.frustumCulled = false;
  const scene = new Scene();
  scene.add(lines, nodes);
  // The shaders write clip-space positions directly, so the camera is never used.
  const camera = new Camera();

  let rafId = 0;
  let running = false;
  let disposed = false;
  let lastFrame = 0;
  let clock = 0;
  let visible = true;
  let lastInput = performance.now();

  const draw = (seconds: number) => {
    uniforms.uTime.value = seconds;
    renderer.render(scene, camera);
  };

  let lastWidth = 0;
  let lastHeight = 0;
  let resizeRaf = 0;
  const applySize = () => {
    resizeRaf = 0;
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Mobile URL-bar show/hide only changes height by a small amount: keep the
    // buffer instead of reallocating it (the canvas is CSS-stretched anyway).
    const heightOnlySmallChange = width === lastWidth && Math.abs(height - lastHeight) < HEIGHT_JITTER_PX;
    if (lastWidth && heightOnlySmallChange) return;
    lastWidth = width;
    lastHeight = height;
    renderer.setSize(width, height, false);
    uniforms.uAspect.value = width / Math.max(height, 1);
    // setSize clears the drawing buffer; a non-animated mode has no loop to repaint it.
    if (mode !== 'animated' && !disposed) draw(STILL_FRAME_TIME_S);
  };
  const resize = () => {
    if (!resizeRaf) resizeRaf = requestAnimationFrame(applySize);
  };


  const frame = (now: number) => {
    rafId = 0;
    if (!running) return;
    const active = trail.active;
    if (!active && performance.now() - lastInput > IDLE_PAUSE_MS) {
      stop();
      return;
    }
    rafId = requestAnimationFrame(frame);
    const elapsed = now - lastFrame;
    const minFrame = active ? (coarse ? ACTIVE_TOUCH_FRAME_MS : ACTIVE_FRAME_MS) : IDLE_FRAME_MS;
    if (elapsed < minFrame - FRAME_TOLERANCE_MS) return;
    const dt = Math.min(elapsed, 100) / 1000;
    lastFrame = now;
    clock += dt;
    trail.update(clock, dt);
    draw(clock);
  };

  const startLoop = () => {
    if (running || disposed || mode !== 'animated' || !visible || document.hidden) return;
    running = true;
    lastFrame = performance.now();
    rafId = requestAnimationFrame(frame);
  };
  const stop = () => {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const wake = () => {
    lastInput = performance.now();
    if (!running) startLoop();
  };
  const WAKE_EVENTS = ['scroll', 'wheel', 'keydown', 'touchstart'] as const;
  const onPointer = (event: PointerEvent) => {
    wake();
    trail.move(event.clientX, event.clientY, event.pointerType === 'touch');
  };
  const onRelease = () => trail.release();
  const onMouseLeave = (event: MouseEvent) => {
    if (!event.relatedTarget) trail.release();
  };
  const onTouch = (event: TouchEvent) => {
    const touch = event.touches[0];
    wake();
    if (touch) trail.move(touch.clientX, touch.clientY, true);
  };
  const onVisibility = () => (document.hidden ? stop() : startLoop());
  const onContextLost = (event: Event) => {
    event.preventDefault();
    stop();
  };
  const onContextRestored = () => {
    if (mode === 'animated') startLoop();
    else draw(STILL_FRAME_TIME_S);
  };
  const observer =
    typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
          visible = entries[entries.length - 1]?.isIntersecting ?? true;
          if (visible) startLoop();
          else stop();
        })
      : null;

  applySize();
  // Compile shaders off the main thread where supported, so the first frame is not one long task.
  try {
    await renderer.compileAsync(scene, camera);
  } catch {
    // Falls back to compiling on the first render.
  }
  await yieldToMain();
  window.addEventListener('resize', resize, { passive: true });
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);
  if (mode === 'animated') {
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    WAKE_EVENTS.forEach((type) => window.addEventListener(type, wake, { passive: true }));
    window.addEventListener('touchend', onRelease, { passive: true });
    window.addEventListener('pointercancel', onRelease, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);
    observer?.observe(container);
    if (initialPointer) trail.move(initialPointer.x, initialPointer.y, initialPointer.touch);
    startLoop();
  } else {
    draw(STILL_FRAME_TIME_S);
  }
  requestAnimationFrame(() => container.classList.add('is-live'));

  return {
    dispose: () => {
      disposed = true;
      stop();
      observer?.disconnect();
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('touchmove', onTouch);
      WAKE_EVENTS.forEach((type) => window.removeEventListener(type, wake));
      window.removeEventListener('touchend', onRelease);
      window.removeEventListener('pointercancel', onRelease);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      lineGeometry.dispose();
      nodeGeometry.dispose();
      lineMaterial.dispose();
      nodeMaterial.dispose();
      renderer.dispose();
      canvas.remove();
      container.classList.remove('is-live');
    },
  };
}
