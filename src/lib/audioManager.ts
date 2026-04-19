export class AudioManager {
  private static instance: AudioManager;
  private currentAudio: HTMLAudioElement | null = null;
  private currentSrc: string = "";
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  private isMuted: boolean = false;

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  playSong(src: string, volume: number = 0.4, fallbackSrc?: string): void {
    if (this.currentSrc === src) return;
    if (this.isMuted) return;

    this.fadeOut(() => {
      this.currentSrc = src;
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0;
      this.currentAudio = audio;

      audio.addEventListener("error", () => {
        this.currentAudio = null;
        this.currentSrc = "";
        if (fallbackSrc && fallbackSrc !== src) {
          this.playSong(fallbackSrc, volume);
        }
      });

      audio.play().catch(() => {
        // Autoplay blocked — fail silently
      });

      this.fadeIn(volume);
    });
  }

  private fadeOut(onComplete?: () => void): void {
    if (!this.currentAudio) {
      onComplete?.();
      return;
    }
    const audio = this.currentAudio;
    let vol = audio.volume;
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      vol = Math.max(0, vol - 0.05);
      audio.volume = vol;
      if (vol <= 0) {
        clearInterval(this.fadeInterval!);
        audio.pause();
        audio.src = "";
        onComplete?.();
      }
    }, 50);
  }

  private fadeIn(targetVolume: number): void {
    if (!this.currentAudio) return;
    const audio = this.currentAudio;
    let vol = 0;
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      vol = Math.min(targetVolume, vol + 0.02);
      audio.volume = vol;
      if (vol >= targetVolume) {
        clearInterval(this.fadeInterval!);
      }
    }, 50);
  }

  mute(): void {
    this.isMuted = true;
    this.fadeOut();
  }

  unmute(): void {
    this.isMuted = false;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  stop(): void {
    this.fadeOut();
    this.currentSrc = "";
  }
}
