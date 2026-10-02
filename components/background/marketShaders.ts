// GLSL for the market-lines background. Chart height and cursor lift are
// computed on the GPU so the CPU only uploads a time value and a few trail points.

export const TRAIL_POINTS = 6;

const COMMON = /* glsl */ `
uniform float uTime;
uniform float uAspect;
uniform float uLines;
uniform vec3 uTrail[${TRAIL_POINTS}];

varying float vGlow;
varying float vEdge;
varying float vIdx;

float hash(float n){ return fract(sin(n * 127.1) * 43758.5453123); }
float vnoise(float x){
  float i = floor(x);
  float f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), f);
}

float lineSpeed(float seed){ return 0.1 + hash(seed) * 0.1; }

// Jagged, price-chart-like curve that scrolls sideways as time advances.
float chart(float u, float seed, float t){
  float p = u * 3.2 + t * lineSpeed(seed) + seed * 17.0;
  return vnoise(p * 2.0) * 0.5 + vnoise(p * 5.0 + 31.0) * 0.3 + vnoise(p * 13.0 + 7.0) * 0.2 - 0.5;
}

float baseY(float idx){ return mix(-0.78, 0.78, (idx + 0.5) / uLines); }

// Returns the lifted position and writes the glow amount (0..1) near the cursor trail.
vec2 place(float u, float idx, float seed, out float glow){
  float x = u * 2.1 - 1.05;
  // Slow undulation keeps the field alive even when nothing moves.
  float sway = sin(uTime * 0.45 + seed * 23.0 + u * 2.4) * 0.018;
  float y = baseY(idx) + chart(u, seed, uTime) * 0.17 + sway;
  float lift = 0.0;
  for (int i = 0; i < ${TRAIL_POINTS}; i++) {
    vec3 tp = uTrail[i];
    vec2 d = vec2((x - tp.x) * uAspect, y - tp.y);
    lift += tp.z * exp(-dot(d, d) / 0.075);
  }
  glow = clamp(lift, 0.0, 1.0);
  y += lift * (0.17 + 0.08 * vnoise(u * 40.0 + seed * 9.0));
  return vec2(x, y);
}

void edges(float u, float idx){
  vEdge = smoothstep(0.0, 0.1, u) * (1.0 - smoothstep(0.9, 1.0, u));
  vIdx = idx;
}
`;

export const LINE_VERTEX = /* glsl */ `
${COMMON}
void main(){
  float u = position.x;
  float idx = position.y;
  float glow;
  vec2 p = place(u, idx, position.z, glow);
  vGlow = glow;
  edges(u, idx);
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

export const NODE_VERTEX = /* glsl */ `
${COMMON}
uniform float uPixelRatio;
void main(){
  float idx = position.y;
  float seed = position.z;
  // A node rides its line: it drifts left at the same speed the chart scrolls.
  float u = fract(position.x - uTime * lineSpeed(seed) / 3.2);
  float glow;
  vec2 p = place(u, idx, seed, glow);
  vGlow = glow;
  edges(u, idx);
  float pulse = 0.5 + 0.5 * sin(uTime * 1.3 + seed * 9.0);
  gl_PointSize = (6.0 + 4.0 * pulse + 12.0 * glow) * uPixelRatio;
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

const FRAGMENT_HEAD = /* glsl */ `
uniform vec3 uColA;
uniform vec3 uColB;
uniform float uAlpha;
varying float vGlow;
varying float vEdge;
varying float vIdx;

vec3 lineColor(){
  vec3 quiet = mix(mix(uColB, vec3(1.0), 0.4), uColA, mod(vIdx, 2.0));
  return mix(quiet, uColA, vGlow);
}
`;

export const LINE_FRAGMENT = /* glsl */ `
${FRAGMENT_HEAD}
void main(){
  float a = (uAlpha + vGlow * 0.6) * vEdge;
  gl_FragColor = vec4(lineColor(), a);
}
`;

export const NODE_FRAGMENT = /* glsl */ `
${FRAGMENT_HEAD}
void main(){
  float d = length(gl_PointCoord - 0.5);
  float soft = smoothstep(0.5, 0.0, d);
  float a = soft * soft * (0.7 + vGlow * 0.5) * vEdge;
  gl_FragColor = vec4(lineColor(), a);
}
`;
