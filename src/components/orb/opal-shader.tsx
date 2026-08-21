import { useEffect, useRef } from "react";

type ShaderState = "idle" | "listening" | "thinking" | "speaking" | "resting";

const VS = `
attribute vec2 a_pos;
varying vec2 vUv;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FS = `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform float u_intensity;
uniform float u_hue;
uniform float u_speed;
uniform float u_bio;
uniform vec2 u_res;

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p *= 2.03;
    a *= 0.52;
  }
  return v;
}

void main() {
  vec2 uv = vUv - 0.5;
  float d = length(uv);
  if (d > 0.5) { gl_FragColor = vec4(0.0); return; }

  float t = u_time * u_speed;

  float ang = t * 0.22 + d * 1.4;
  float ca = cos(ang), sa = sin(ang);
  vec2 q = mat2(ca, -sa, sa, ca) * uv * 2.15;

  vec2 w1 = vec2(fbm(q + vec2(t * 0.31, t * 0.19)), fbm(q + vec2(-t * 0.24, t * 0.27) + 4.1));
  vec2 w2 = vec2(fbm(q + 1.85 * w1 + vec2(t * 0.28, 0.05)), fbm(q + 1.85 * w1 + vec2(0.0, -t * 0.33) + 2.7));
  float flow = fbm(q + 2.4 * w2);

  float band = flow * 5.2 + t * 0.55 + u_hue + length(w2) * 1.1;
  float h = fract(0.78 + 0.16 * sin(band) + w1.x * 0.12);
  float pool = smoothstep(0.12, 0.92, flow);
  float shimmer = 0.5 + 0.5 * sin(flow * 9.0 + t * 1.6);

  vec3 oil = hsv2rgb(vec3(h, 0.72, (pool * 0.62 + shimmer * 0.22) * u_intensity));

  float crown = smoothstep(0.42, 0.0, length(uv - vec2(-0.16, 0.20)));
  vec3 chrome = mix(vec3(0.05, 0.04, 0.10), vec3(0.32, 0.30, 0.48), crown);
  chrome = mix(chrome, vec3(0.70, 0.82, 0.92), crown * crown * 0.5);

  float fres = pow(smoothstep(0.18, 0.5, d), 1.6);
  vec3 rim = hsv2rgb(vec3(fract(0.72 + t * 0.08 + u_hue), 0.45, 0.95));

  vec3 col = chrome + oil * 0.78 + rim * fres * 0.42;

  float core = smoothstep(0.16, 0.0, length(uv - vec2(0.02, 0.01)));

  // Cold light from inside — ~480nm cyan, like dinoflagellates / photophores.
  float breath = 0.55 + 0.45 * sin(t * 2.15);
  float dusk = 0.55 + 0.45 * sin(t * 0.62 + 1.4);
  vec3 bio = mix(vec3(0.18, 0.95, 0.88), vec3(0.42, 1.0, 0.58), dusk);

  // Comb-row / mycelial filaments along the liquid ridges
  float ridge = abs(sin(flow * 13.5 + t * 0.85));
  float vein = pow(smoothstep(0.55, 0.98, ridge), 2.4) * (0.28 + 0.72 * breath);

  // Discrete photophores that wander and flash independently
  float photos = 0.0;
  for (int i = 0; i < 9; i++) {
    float fi = float(i);
    vec2 seed = vec2(fi * 1.17, fi * 0.73);
    vec2 p = vec2(hash(seed), hash(seed.yx + 2.4)) - 0.5;
    p *= 0.58;
    p += 0.13 * vec2(sin(t * 0.34 + fi), cos(t * 0.27 + fi * 1.37));
    float pl = length(p);
    if (pl > 0.40) p *= 0.40 / pl;
    float rad = 0.016 + 0.014 * hash(seed + 8.1);
    float flash = sin(t * (1.55 + fi * 0.33) + fi * 1.7);
    flash = pow(max(flash, 0.0), 5.0);
    photos += smoothstep(rad * 2.6, 0.0, length(uv - p)) * (0.22 + flash * 1.15);
  }

  // Drifting motes (plankton)
  float motes = 0.0;
  for (int j = 0; j < 7; j++) {
    float fj = float(j);
    vec2 m = vec2(hash(vec2(fj, 3.1)), hash(vec2(9.4, fj))) - 0.5;
    m += 0.22 * vec2(sin(t * 0.21 + fj * 0.9), cos(t * 0.18 + fj * 1.2));
    m *= 0.72;
    motes += smoothstep(0.012, 0.0, length(uv - m));
  }

  float emit = (vein * 0.7 + photos * 1.05 + motes * 0.55 + core * 0.3) * u_bio * u_intensity;
  col += bio * emit;
  col += bio * emit * emit * 0.9;

  // Subsurface scatter — light blooms through the metal, strongest at center
  float sss = (1.0 - smoothstep(0.0, 0.48, d)) * emit * 0.35;
  col += bio * sss;

  float shade = smoothstep(0.5, 0.08, d);
  col *= mix(0.48, 1.0, shade);

  float a = smoothstep(0.5, 0.455, d);
  gl_FragColor = vec4(col, a);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

const STATE: Record<ShaderState, { hue: number; speed: number; intensity: number; bio: number }> = {
  idle: { hue: 0, speed: 0.55, intensity: 1, bio: 0.9 },
  resting: { hue: 0.02, speed: 0.38, intensity: 0.88, bio: 0.55 },
  listening: { hue: -0.16, speed: 0.9, intensity: 1.1, bio: 1.25 },
  thinking: { hue: -0.08, speed: 1.15, intensity: 1.05, bio: 1.05 },
  speaking: { hue: 0.05, speed: 1.32, intensity: 1.18, bio: 1.4 },
};

export function OpalShader({ state = "idle" }: { state?: ShaderState }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VS);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uInt = gl.getUniformLocation(prog, "u_intensity");
    const uHue = gl.getUniformLocation(prog, "u_hue");
    const uSpeed = gl.getUniformLocation(prog, "u_speed");
    const uBio = gl.getUniformLocation(prog, "u_bio");
    const uRes = gl.getUniformLocation(prog, "u_res");

    let raf = 0;
    let alive = true;
    const t0 = performance.now();
    let last = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || 160;
      const h = parent?.clientHeight || 160;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(32, Math.floor(w * dpr));
      canvas.height = Math.max(32, Math.floor(h * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const draw = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(draw);
      if (reduce && last > 0) return;
      if (now - last < 30) return;
      last = now;
      const st = STATE[stateRef.current] ?? STATE.idle;
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform1f(uInt, st.intensity);
      gl.uniform1f(uHue, st.hue);
      gl.uniform1f(uSpeed, st.speed);
      gl.uniform1f(uBio, st.bio);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    raf = requestAnimationFrame(draw);

    const onHide = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onHide);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={canvasRef} className="orb-shader" aria-hidden />;
}
