// Audio synthesizer & Sound FX using Web Audio API

let globalAudioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (!globalAudioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      globalAudioCtx = new AudioContextClass();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(() => {});
  }
  return globalAudioCtx;
};

export type SoundType = 'click' | 'tab' | 'card' | 'dice' | 'correct' | 'wrong' | 'fanfare' | 'ladder' | 'snake';

export const playSound = (type: SoundType) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'click' || type === 'tab') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'card') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'dice') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(660, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'fanfare') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.12);
      osc.frequency.setValueAtTime(783.99, now + 0.24);
      osc.frequency.setValueAtTime(1046.5, now + 0.36);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'ladder') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'snake') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.error('Audio Error:', e);
  }
};

// Web Speech API Synthesis for Indonesian text-to-speech
export const speakText = (
  text: string,
  onStartCallback?: () => void,
  onEndCallback?: () => void
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Browser tidak mendukung Web Speech API.');
    if (onEndCallback) onEndCallback();
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    if (onStartCallback) onStartCallback();
  };

  utterance.onend = () => {
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = (event) => {
    console.warn('SpeechSynthesis error:', event);
    if (onEndCallback) onEndCallback();
  };

  setTimeout(() => {
    synth.speak(utterance);
  }, 50);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

let activeMelodyTimeoutIds: number[] = [];

export const stopMelody = () => {
  activeMelodyTimeoutIds.forEach((id) => clearTimeout(id));
  activeMelodyTimeoutIds = [];
};

export const playMelody = (melodyType: 'melayu' | 'karo' | 'simalungun' | 'mars') => {
  stopMelody();
  const ctx = getAudioContext();
  if (!ctx) return;

  // Notes in Hz
  const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33;

  let sequence: { freq: number; dur: number; gap: number }[] = [];

  if (melodyType === 'melayu') {
    // Tanjung Katung / Zapin festive rhythm
    sequence = [
      { freq: G4, dur: 0.25, gap: 0.3 },
      { freq: A4, dur: 0.25, gap: 0.3 },
      { freq: C5, dur: 0.35, gap: 0.4 },
      { freq: A4, dur: 0.25, gap: 0.3 },
      { freq: G4, dur: 0.25, gap: 0.3 },
      { freq: E4, dur: 0.45, gap: 0.5 },
      { freq: G4, dur: 0.25, gap: 0.3 },
      { freq: A4, dur: 0.35, gap: 0.4 },
      { freq: G4, dur: 0.5, gap: 0.6 },
    ];
  } else if (melodyType === 'karo') {
    // Piso Surit / Kulcapi melancholy pastoral tune
    sequence = [
      { freq: E4, dur: 0.35, gap: 0.4 },
      { freq: G4, dur: 0.35, gap: 0.4 },
      { freq: A4, dur: 0.5, gap: 0.6 },
      { freq: G4, dur: 0.35, gap: 0.4 },
      { freq: E4, dur: 0.35, gap: 0.4 },
      { freq: D4, dur: 0.5, gap: 0.6 },
      { freq: E4, dur: 0.35, gap: 0.4 },
      { freq: G4, dur: 0.6, gap: 0.7 },
    ];
  } else if (melodyType === 'simalungun') {
    // Pos Ni Uhur / Gonrang majestic rhythm
    sequence = [
      { freq: C4, dur: 0.3, gap: 0.35 },
      { freq: E4, dur: 0.3, gap: 0.35 },
      { freq: G4, dur: 0.45, gap: 0.5 },
      { freq: A4, dur: 0.3, gap: 0.35 },
      { freq: G4, dur: 0.3, gap: 0.35 },
      { freq: E4, dur: 0.4, gap: 0.45 },
      { freq: D4, dur: 0.3, gap: 0.35 },
      { freq: C4, dur: 0.6, gap: 0.7 },
    ];
  } else {
    // Mars Deli Serdang triumphant
    sequence = [
      { freq: C4, dur: 0.3, gap: 0.35 },
      { freq: E4, dur: 0.3, gap: 0.35 },
      { freq: G4, dur: 0.3, gap: 0.35 },
      { freq: C5, dur: 0.6, gap: 0.65 },
      { freq: B4, dur: 0.3, gap: 0.35 },
      { freq: A4, dur: 0.3, gap: 0.35 },
      { freq: G4, dur: 0.6, gap: 0.7 },
    ];
  }

  let accumulatedTime = 0;
  sequence.forEach((note) => {
    const timeoutId = window.setTimeout(() => {
      try {
        const audioCtx = getAudioContext();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        // Warm flute / bells timbre
        osc.type = melodyType === 'karo' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(note.freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.dur);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now);
        osc.stop(now + note.dur);
      } catch (err) {
        console.error(err);
      }
    }, accumulatedTime * 1000);

    activeMelodyTimeoutIds.push(timeoutId);
    accumulatedTime += note.gap;
  });
};

