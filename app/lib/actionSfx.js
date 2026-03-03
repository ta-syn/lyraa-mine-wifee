"use client";

let authCtx = null;
let authMaster = null;

const getAuthContext = () => {
  if (typeof window === "undefined") return null;
  if (!authCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    authCtx = new Ctor();
  }
  return authCtx;
};

const getOutput = () => {
  const ctx = getAuthContext();
  if (!ctx || ctx.state !== "running") return null;

  if (!authMaster) {
    authMaster = ctx.createGain();
    authMaster.gain.value = 0.9;
    authMaster.connect(ctx.destination);
  }

  return { ctx, output: authMaster };
};

const playTone = ({ frequency, endFrequency, duration, gain, type = "sine" }) => {
  const graph = getOutput();
  if (!graph) return false;
  const { ctx, output } = graph;

  const startAt = ctx.currentTime + 0.001;
  const endAt = startAt + duration;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startAt);
  if (endFrequency) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(60, endFrequency), endAt);
  }

  env.gain.setValueAtTime(0.0001, startAt);
  env.gain.exponentialRampToValueAtTime(gain, startAt + Math.min(0.012, duration * 0.35));
  env.gain.exponentialRampToValueAtTime(0.0001, endAt + 0.04);

  osc.connect(env);
  env.connect(output);
  osc.start(startAt);
  osc.stop(endAt + 0.06);
  return true;
};

const scheduleAuthPattern = (mode) => {
  if (mode === "logout") {
    playTone({ frequency: 520, endFrequency: 430, duration: 0.08, gain: 0.06, type: "triangle" });
    window.setTimeout(() => {
      playTone({ frequency: 360, endFrequency: 280, duration: 0.09, gain: 0.05, type: "sine" });
    }, 70);
    return;
  }

  playTone({ frequency: 640, endFrequency: 780, duration: 0.08, gain: 0.06, type: "triangle" });
  window.setTimeout(() => {
    playTone({ frequency: 940, endFrequency: 1160, duration: 0.1, gain: 0.045, type: "sine" });
  }, 75);
};

export const playAuthActionSfx = (mode = "login") => {
  const ctx = getAuthContext();
  if (!ctx) return;

  if (ctx.state !== "running") {
    ctx
      .resume()
      .then(() => {
        scheduleAuthPattern(mode);
      })
      .catch(() => {});
    return;
  }

  scheduleAuthPattern(mode);
};
