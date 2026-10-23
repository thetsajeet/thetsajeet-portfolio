/**
 * Audio synthesis engine using Web Audio API
 * Generates natural water drops, bubbles, whooshes, and clicks without external audio files.
 */

class SoundEngine {
  private ac: AudioContext | null = null;
  private master: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private enabled: boolean = true;
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ajeet-sound');
      this.enabled = stored !== 'off';
    }
  }

  private init() {
    if (this.ac) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ac = new AudioContextClass();
    this.master = this.ac.createGain();
    this.master.gain.value = 0.28;

    // Gentle low-pass filter to soften clicks
    const filter = this.ac.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 4400;

    this.master.connect(filter);
    filter.connect(this.ac.destination);

    // Shared white noise buffer for splash attacks
    this.noiseBuffer = this.ac.createBuffer(1, Math.floor(this.ac.sampleRate * 0.05), this.ac.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  public unlock() {
    this.init();
    if (!this.ac) return;
    if (this.ac.state === 'suspended') {
      this.ac.resume().then(() => {
        this.isUnlocked = true;
      }).catch(() => {});
    } else {
      this.isUnlocked = true;
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ajeet-sound', this.enabled ? 'on' : 'off');
    }
    if (this.enabled) {
      this.unlock();
      this.drop();
    }
    return this.enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Delicate water drop sound
   */
  public drop(customFreq?: number) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ac || !this.master) return;

    try {
      const t = this.ac.currentTime;
      const f0 = customFreq || (620 + Math.random() * 220);
      const len = 0.14;

      const osc = this.ac.createOscillator();
      const gain = this.ac.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f0, t);
      osc.frequency.exponentialRampToValueAtTime(f0 * 2.4, t + len * 0.45);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.4, t + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.12, t + len * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len);

      osc.connect(gain);
      gain.connect(this.master);

      osc.start(t);
      osc.stop(t + len + 0.02);
    } catch {
      // Audio context might be restricted
    }
  }

  /**
   * Resonant water bubble
   */
  public bubble() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ac || !this.master) return;

    try {
      const t = this.ac.currentTime;
      const f0 = 240 + Math.random() * 70;
      const len = 0.22;

      const osc = this.ac.createOscillator();
      const gain = this.ac.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f0, t);
      osc.frequency.exponentialRampToValueAtTime(f0 * 3.2, t + len * 0.5);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.45, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len);

      osc.connect(gain);
      gain.connect(this.master);

      osc.start(t);
      osc.stop(t + len + 0.02);
    } catch {}
  }

  /**
   * Subtle UI click / tick
   */
  public tick() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ac || !this.master) return;

    try {
      const t = this.ac.currentTime;
      const f0 = 1200 + Math.random() * 300;
      const len = 0.06;

      const osc = this.ac.createOscillator();
      const gain = this.ac.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f0, t);
      osc.frequency.exponentialRampToValueAtTime(f0 * 1.8, t + len * 0.4);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len);

      osc.connect(gain);
      gain.connect(this.master);

      osc.start(t);
      osc.stop(t + len + 0.01);
    } catch {}
  }

  /**
   * Smooth swell / whoosh for modal transitions or cards
   */
  public whoosh() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ac || !this.master) return;

    try {
      const t = this.ac.currentTime;
      const dur = 0.4;

      const osc = this.ac.createOscillator();
      const gain = this.ac.createGain();
      const filter = this.ac.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, t);
      filter.frequency.exponentialRampToValueAtTime(1200, t + dur * 0.6);
      filter.frequency.exponentialRampToValueAtTime(150, t + dur);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + dur * 0.5);
      osc.frequency.exponentialRampToValueAtTime(60, t + dur);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.3, t + dur * 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);

      osc.start(t);
      osc.stop(t + dur + 0.05);
    } catch {}
  }

  /**
   * Success chime / victory sound
   */
  public chime() {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ac || !this.master) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ac || !this.master) return;
        const t = this.ac.currentTime + idx * 0.07;
        const dur = 0.35;
        const osc = this.ac.createOscillator();
        const gain = this.ac.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc.connect(gain);
        gain.connect(this.master);

        osc.start(t);
        osc.stop(t + dur + 0.02);
      });
    } catch {}
  }
}

export const sound = new SoundEngine();
