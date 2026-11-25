let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;

  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  gainPeak = 0.04,
  delay = 0
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.01);
}

export function playClickSound(isCrit: boolean): void {
  if (isCrit) {
    playTone(880, 0.07, "square", 0.05, 0);
    playTone(1320, 0.1, "triangle", 0.06, 0.05);
  } else {
    playTone(520 + Math.random() * 90, 0.045, "square", 0.025, 0);
  }
}

export function playBuySound(): void {
  playTone(587.33, 0.06, "triangle", 0.045, 0);
  playTone(880, 0.09, "triangle", 0.05, 0.055);
}

export function playOverclockSound(): void {
  playTone(440, 0.08, "sawtooth", 0.04, 0);
  playTone(660, 0.08, "sawtooth", 0.045, 0.07);
  playTone(990, 0.14, "sawtooth", 0.05, 0.14);
}

export function playEventSound(): void {
  playTone(659.25, 0.07, "square", 0.045, 0);
  playTone(987.77, 0.08, "square", 0.05, 0.06);
  playTone(1318.5, 0.14, "triangle", 0.055, 0.12);
}

export function playAscendSound(): void {
  playTone(392.0, 0.1, "triangle", 0.05, 0);
  playTone(523.25, 0.1, "triangle", 0.05, 0.09);
  playTone(659.25, 0.12, "triangle", 0.055, 0.18);
  playTone(1046.5, 0.24, "triangle", 0.06, 0.27);
}

export function playEmpSound(): void {
  playTone(220, 0.12, "sawtooth", 0.055, 0);
  playTone(440, 0.1, "square", 0.05, 0.06);
  playTone(880, 0.14, "sawtooth", 0.055, 0.12);
  playTone(1760, 0.2, "triangle", 0.05, 0.18);
}
