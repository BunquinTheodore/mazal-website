import { Vector3 } from 'three';
import { TRAIL_POINTS } from './marketShaders';

const TRAIL_LIFETIME_S = 1.1;
const SAMPLE_EVERY_S = 0.05;
const MOUSE_HOVER_POWER = 0.7;
const TOUCH_HOVER_POWER = 0.6;
const TOUCH_RELEASE_S = 0.9;
// The pointer counts as active this long after its last movement; then the head fades.
const ACTIVE_MS = 1500;

export type PointerStart = { x: number; y: number; touch: boolean };
type Sample = { x: number; y: number; born: number; power: number };

// Eased pointer plus a short fading trail, expressed in clip space (-1..1, y up).
// Slot 0 is the "hover" head: it stays lit while a mouse is over the page or a
// finger is down, so the cursor reaction is visible even when you hold still.
// Slots 1.. are the fading motion trail.
export class PointerTrail {
  readonly uniform: Vector3[] = Array.from({ length: TRAIL_POINTS }, () => new Vector3(0, 0, 0));
  private targetX = 0;
  private targetY = 0;
  private x = 0;
  private y = 0;
  private energy = 0;
  private touchScale = 1;
  private seen = false;
  private held = false;
  private lastMoveAt = -Infinity;
  private hoverPower = 0;
  private hoverTarget = 0;
  private samples: Sample[] = [];
  private lastSample = 0;

  move(clientX: number, clientY: number, touch: boolean) {
    const nx = (clientX / window.innerWidth) * 2 - 1;
    const ny = -((clientY / window.innerHeight) * 2 - 1);
    if (!this.seen) {
      this.x = nx;
      this.y = ny;
      this.seen = true;
    }
    this.targetX = nx;
    this.targetY = ny;
    this.touchScale = touch ? 0.7 : 1;
    this.held = true;
    this.lastMoveAt = performance.now();
    this.hoverTarget = touch ? TOUCH_HOVER_POWER : MOUSE_HOVER_POWER;
  }

  // Mouse left the window, or the finger lifted: the head fades out.
  release() {
    this.held = false;
    this.hoverTarget = 0;
  }

  // Active only for ACTIVE_MS after the last movement (mouse or finger), so a
  // stationary pointer, held finger included, lets the loop drop to the idle cap.
  private decayHeld() {
    if (this.held && performance.now() - this.lastMoveAt > ACTIVE_MS) {
      this.held = false;
      this.hoverTarget = 0;
    }
  }

  // True while the pointer moved recently; the fade-out tail runs at the idle rate.
  get active(): boolean {
    this.decayHeld();
    return this.held;
  }

  update(now: number, dt: number) {
    this.decayHeld();
    if (this.seen) {
      const ease = 1 - Math.exp(-dt * 7);
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      this.x += dx * ease;
      this.y += dy * ease;
      const speed = Math.hypot(dx, dy);
      this.energy = Math.min(1, this.energy + speed * 1.6);
      this.energy *= Math.exp(-dt * 1.6);
      const fadeRate = this.held ? 6 : 1 / (TOUCH_RELEASE_S / 3);
      this.hoverPower += (this.hoverTarget - this.hoverPower) * (1 - Math.exp(-dt * fadeRate));
      if (this.energy > 0.03 && now - this.lastSample > SAMPLE_EVERY_S) {
        this.lastSample = now;
        this.samples = [
          { x: this.x, y: this.y, born: now, power: this.energy * this.touchScale },
          ...this.samples,
        ].slice(0, TRAIL_POINTS - 1);
      }
    }
    this.write(now);
  }

  private write(now: number) {
    this.uniform[0].set(this.x, this.y, this.seen ? this.hoverPower : 0);
    for (let i = 1; i < TRAIL_POINTS; i += 1) {
      const sample = this.samples[i - 1];
      const slot = this.uniform[i];
      if (!sample) {
        slot.set(0, 0, 0);
        continue;
      }
      const life = Math.max(0, 1 - (now - sample.born) / TRAIL_LIFETIME_S);
      slot.set(sample.x, sample.y, sample.power * life * life);
    }
    if (this.samples.length && now - this.samples[this.samples.length - 1].born > TRAIL_LIFETIME_S) {
      this.samples = this.samples.filter((s) => now - s.born <= TRAIL_LIFETIME_S);
    }
  }
}
