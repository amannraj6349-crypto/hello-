// =========================================================================
// Romantic Ambient Sound Synthesizer & Music Player
// =========================================================================
// Provides an emotional, gentle music box / acoustic chime progression
// using Web Audio API + seamlessly plays custom MP3 files if present.

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentStep = 0;
  private audioElement: HTMLAudioElement | null = null;
  private isAudioFileActive = false;

  private chordProgression = [
    // Emotional Romantic Chord notes (frequencies in Hz): Fmaj9 -> Cmaj7 -> Dm9 -> Bbmaj9
    [349.23, 440.0, 523.25, 659.25, 783.99], // F4, A4, C5, E5, G5
    [261.63, 329.63, 392.0, 493.88, 587.33], // C4, E4, G4, B4, D5
    [293.66, 349.23, 440.0, 523.25, 659.25], // D4, F4, A4, C5, E5
    [233.08, 293.66, 349.23, 440.0, 523.25], // Bb3, D4, F4, A4, C5
  ];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Soft haptic feedback helper for smartphones
  public triggerHaptic(pattern: number | number[] = [25, 35, 25]) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Haptics optional
      }
    }
  }

  // Play a soft gentle bell chime note with natural exponential decay
  public playChime(freq: number, timeOffset = 0, gainLevel = 0.08) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime + timeOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm low-pass filter for cozy intimate tone
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Add gentle harmonic overtone for music-box sparkle
      const overtone = ctx.createOscillator();
      const overGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, now);

      // Envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      overGain.gain.setValueAtTime(0.0001, now);
      overGain.gain.linearRampToValueAtTime(gainLevel * 0.25, now + 0.04);
      overGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      overtone.connect(overGain);

      gain.connect(filter);
      overGain.connect(filter);
      filter.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 3.5);
      overtone.stop(now + 2.0);
    } catch {
      // Audio autoplay gracefully handled
    }
  }

  // Heartbeat sound effect for task completion & final reveal
  public playHeartbeatEffect() {
    this.triggerHaptic([40, 50, 40]);
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [0, 0.22].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(idx === 0 ? 75 : 60, now + offset);
        osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.18);

        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.3);
      });
    } catch {
      // ignore
    }
  }

  // Sparkle chime effect for unlock moments
  public playSparkleUnlock() {
    this.triggerHaptic([30, 40, 30, 40, 50]);
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playChime(freq, idx * 0.1, 0.12);
    });
  }

  private stepMelody = () => {
    if (!this.isPlaying) return;

    const chord = this.chordProgression[this.currentStep % this.chordProgression.length];
    
    // Play warm root chord
    this.playChime(chord[0] / 2, 0, 0.06); // bass note
    this.playChime(chord[1], 0.2, 0.05);
    this.playChime(chord[2], 0.6, 0.06);
    this.playChime(chord[3], 1.1, 0.07);
    this.playChime(chord[4], 1.6, 0.05);
    this.playChime(chord[2] * 2, 2.2, 0.04);

    this.currentStep++;
    this.timerId = window.setTimeout(this.stepMelody, 3200);
  };

  public toggleMusic(customAudioUrl?: string, onStatusChange?: (playing: boolean) => void): boolean {
    if (this.isPlaying) {
      this.stop();
      if (onStatusChange) onStatusChange(false);
      return false;
    } else {
      this.start(customAudioUrl);
      if (onStatusChange) onStatusChange(true);
      return true;
    }
  }

  public start(customAudioUrl?: string) {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.triggerHaptic(30);

    // Try custom audio file first if provided
    if (customAudioUrl && customAudioUrl.trim() !== '') {
      if (!this.audioElement) {
        this.audioElement = new Audio(customAudioUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.6;
      }
      this.audioElement.play().then(() => {
        this.isAudioFileActive = true;
      }).catch(() => {
        // Fallback to synthesized ambient music box
        this.isAudioFileActive = false;
        this.getContext();
        this.stepMelody();
      });
      return;
    }

    // Otherwise use serene synthesized ambient music
    this.getContext();
    this.stepMelody();
  }

  public stop() {
    this.isPlaying = false;
    this.triggerHaptic(20);
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new RomanticSoundEngine();
