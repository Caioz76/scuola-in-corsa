/**
 * Audio 100% procedurale (Web Audio): effetti brevi + loop musicale morbido.
 * Nessun asset. L'AudioContext viene creato al primo gesto utente (unlock).
 */

export type SfxName =
  | 'click' | 'correct' | 'wrong' | 'start' | 'finish' | 'tick' | 'pickup' | 'drop';

class SynthEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private musicTimer: number | null = null;
  private musicStep = 0;
  private nextNoteTime = 0;

  sfxOn = true;
  musicOn = true;
  private sfxVol = 0.5;
  private musicVol = 0.14;

  private ensure(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AC: typeof AudioContext =
          window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.9;
        this.master.connect(this.ctx.destination);
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.sfxVol;
        this.sfxGain.connect(this.master);
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.musicVol;
        this.musicGain.connect(this.master);
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return this.ctx;
    } catch {
      return null;
    }
  }

  /** Da chiamare al primo click/tocco (politiche autoplay dei browser). */
  unlock(): void {
    // Con l'audio tutto spento (es. profilo Sordità) non serve un AudioContext.
    if (!this.sfxOn && !this.musicOn) return;
    const ctx = this.ensure();
    if (!ctx) return;
    // `resume()` è asincrono: sblocca il contesto per gli effetti (SFX) e avvia la musica se attiva
    if (ctx.state === 'running') {
      if (this.musicOn && this.musicTimer === null) this.startMusic();
    } else {
      void ctx
        .resume()
        .then(() => {
          if (this.musicOn && this.musicTimer === null) this.startMusic();
        })
        .catch(() => {});
    }
  }

  /** Contesto audio attivo (gli e2e verificano che il gesto lo sblocchi). */
  get running(): boolean {
    return this.ctx?.state === 'running';
  }

  /** Loop musicale in corso (timer attivo). */
  get musicPlaying(): boolean {
    return this.musicTimer !== null;
  }

  setSfx(on: boolean, vol: number): void {
    this.sfxOn = on;
    this.sfxVol = vol;
    if (this.sfxGain) this.sfxGain.gain.value = vol;
  }

  setMusic(on: boolean, vol: number): void {
    this.musicOn = on;
    this.musicVol = vol;
    if (this.musicGain) this.musicGain.gain.value = on ? vol : 0;
    if (!on) this.stopMusic();
    else if (this.ctx?.state === 'running') this.startMusic();
  }

  private tone(
    ctx: AudioContext,
    freq: number,
    t0: number,
    dur: number,
    type: OscillatorType,
    dest: GainNode,
    vol: number,
    glideTo?: number
  ): void {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), t0 + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  play(name: SfxName): void {
    if (!this.sfxOn) return;
    const ctx = this.ensure();
    if (!ctx || !this.sfxGain) return;
    if (ctx.state === 'suspended') {
      void ctx.resume().catch(() => {});
    }
    const t = ctx.currentTime + 0.01;
    const d = this.sfxGain;
    switch (name) {
      case 'click':
        this.tone(ctx, 660, t, 0.07, 'square', d, 0.22);
        break;
      case 'pickup':
        this.tone(ctx, 520, t, 0.08, 'sine', d, 0.35, 780);
        break;
      case 'drop':
        this.tone(ctx, 300, t, 0.1, 'sine', d, 0.32, 180);
        break;
      case 'tick':
        this.tone(ctx, 880, t, 0.04, 'square', d, 0.14);
        break;
      case 'correct': {
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((f, i) => this.tone(ctx, f, t + i * 0.09, 0.16, 'triangle', d, 0.4));
        break;
      }
      case 'wrong':
        this.tone(ctx, 320, t, 0.16, 'sawtooth', d, 0.2, 220);
        this.tone(ctx, 240, t + 0.14, 0.2, 'sawtooth', d, 0.18, 150);
        break;
      case 'start':
        this.tone(ctx, 392, t, 0.12, 'triangle', d, 0.32);
        this.tone(ctx, 523.25, t + 0.1, 0.12, 'triangle', d, 0.32);
        this.tone(ctx, 659.25, t + 0.2, 0.18, 'triangle', d, 0.38);
        break;
      case 'finish': {
        const seq = [523.25, 659.25, 783.99, 1046.5];
        seq.forEach((f, i) => this.tone(ctx, f, t + i * 0.12, 0.2, 'triangle', d, 0.38));
        this.tone(ctx, 1318.5, t + 0.5, 0.4, 'triangle', d, 0.3);
        break;
      }
    }
  }

  // ── Musica di sottofondo: autentico Chiptune 8-Bit Anni '80 Arcade ──────────
  private chiptuneMelody = [
    523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 783.99, 1046.5,
    880.0, 1046.5, 1318.51, 1046.5, 880.0, 783.99, 659.25, 523.25,
    659.25, 783.99, 880.0, 1046.5, 1174.66, 1046.5, 880.0, 783.99,
    1046.5, 1174.66, 1318.51, 1567.98, 1318.51, 1046.5, 880.0, 783.99
  ];

  private chiptuneBass = [
    130.81, 130.81, 196.0, 196.0, 220.0, 220.0, 174.61, 196.0,
    130.81, 130.81, 196.0, 196.0, 220.0, 220.0, 174.61, 196.0
  ];

  startMusic(): void {
    if (!this.musicOn) return;
    const ctx = this.ctx;
    // Mai prima del gesto che sblocca l'audio: le note finirebbero in coda e
    // partirebbero tutte insieme al resume.
    if (!ctx || ctx.state !== 'running' || this.musicTimer !== null) return;
    this.musicStep = 0;
    this.nextNoteTime = ctx.currentTime + 0.12;
    this.musicTimer = window.setInterval(() => this.schedule(), 90);
  }

  private schedule(): void {
    const ctx = this.ctx;
    const mg = this.musicGain;
    if (!ctx || !mg || !this.musicOn) return;
    const stepDur = 0.145; // Tempo vivace arcade ~130 BPM
    if (this.nextNoteTime < ctx.currentTime) this.nextNoteTime = ctx.currentTime + 0.05;
    while (this.nextNoteTime < ctx.currentTime + 0.35) {
      const t = this.nextNoteTime;
      const noteIdx = this.musicStep % this.chiptuneMelody.length;
      const bassIdx = Math.floor(this.musicStep / 2) % this.chiptuneBass.length;

      // 1. Voce 1: Melodia 8-Bit Square Wave (timbro classico Game Boy / NES)
      const freq = this.chiptuneMelody[noteIdx];
      this.tone(ctx, freq, t, stepDur * 0.78, 'square', mg, 0.08);

      // 2. Voce 2: Basso 8-Bit Triangle Wave (in ottava bassa, groove portante)
      if (this.musicStep % 2 === 0) {
        const bassFreq = this.chiptuneBass[bassIdx];
        this.tone(ctx, bassFreq, t, stepDur * 1.6, 'triangle', mg, 0.22);
      }

      this.musicStep++;
      this.nextNoteTime += stepDur;
    }
  }

  get musicActive(): boolean {
    return this.musicOn;
  }

  toggleMusic(): boolean {
    this.musicOn = !this.musicOn;
    if (this.musicGain) {
      this.musicGain.gain.value = this.musicOn ? this.musicVol : 0;
    }
    if (!this.musicOn) {
      this.stopMusic();
    } else {
      const ctx = this.ensure();
      if (!ctx) return false;
      if (ctx.state === 'running') {
        this.startMusic();
      } else {
        void ctx.resume().then(() => {
          if (this.musicOn) this.startMusic();
        }).catch(() => {});
      }
    }
    window.dispatchEvent(new CustomEvent('sic:music-toggle', { detail: { musicOn: this.musicOn } }));
    return this.musicOn;
  }

  get muted(): boolean {
    return !this.sfxOn && !this.musicOn;
  }

  setMuted(m: boolean): void {
    this.sfxOn = !m;
    this.musicOn = !m;
    if (m) {
      this.stopMusic();
      if (this.master) this.master.gain.value = 0;
    } else {
      if (this.master) this.master.gain.value = 0.9;
      this.startMusic();
    }
    window.dispatchEvent(new CustomEvent('sic:audio-mute', { detail: { muted: m } }));
  }

  toggleMute(): boolean {
    const next = !this.muted;
    this.setMuted(next);
    return next;
  }

  stopMusic(): void {
    if (this.musicTimer !== null) {
      window.clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

/** Singleton globale del motore audio. */
export const synth = new SynthEngine();
