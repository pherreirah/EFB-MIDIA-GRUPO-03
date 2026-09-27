// Clean Cinematic Sound Engine & Web Audio API Synthesizer
// Completely silenced ambient drone/hum to eliminate any background audio noise ("ruído de som").
// Lightweight, responsive and crisp.

class CinemaAudioEngine {
  private ctx: AudioContext | null = null;
  public isAmbiancePlaying: boolean = false;
  public isVideoAudioUnlocked: boolean = false;
  private audioListenersInitialized: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  // Mechanical Camera Shutter Click (Gentle, crisp, single snap)
  public playShutterClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.04);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Safe fallback
    }
  }

  // Mechanical Lens Aperture Dial Click
  public playApertureClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.02);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch {
      // Safe fallback
    }
  }

  // Autofocus Lock Confirmation Beep
  public playAfLockBeep() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now); // A6 note

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Safe fallback
    }
  }

  // Ambient Drone SILENCED COMPLETELY:
  // Removes 100% of background buzzing, humming, and synthetic audio noise requested by the user.
  public startAmbiance() {
    this.isAmbiancePlaying = false;
    // Pure silence - no background rumble or noise oscillators
  }

  public stopAmbiance() {
    this.isAmbiancePlaying = false;
  }

  public toggleAmbiance(): boolean {
    this.isAmbiancePlaying = false;
    return false;
  }

  // Global listener to unlock browser audio on first user gesture
  public setupAutoUnlock(onUnlockCallback?: () => void) {
    if (this.audioListenersInitialized || typeof window === 'undefined') return;
    this.audioListenersInitialized = true;

    const unlock = () => {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      this.isVideoAudioUnlocked = true;
      if (onUnlockCallback) onUnlockCallback();
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('click', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });
  }
}

export const cinemaAudio = new CinemaAudioEngine();
