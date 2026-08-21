import { useCallback, useEffect, useRef, useState } from "react";
import { speakClover, transcribeClover } from "@/lib/speak";

type SpeechRec = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives?: number;
  start: () => void;
  stop: () => void;
  abort?: () => void;
  onresult: ((ev: {
    resultIndex: number;
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string; confidence?: number } }>;
  }) => void) | null;
  onend: (() => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
};

type ListenOpts = {
  onResult: (text: string) => void;
  onInterim: (text: string) => void;
  onEnd: (got: boolean) => void;
};

const SILENCE_MS = 1400;
const MAX_RECORD_MS = 14000;
const WAIT_SPEECH_MS = 9000;
const VOICE_RMS = 0.038;
const BARGE_RMS = 0.11;
const BARGE_HOLD_MS = 220;

function getSpeechRecognition(): (new () => SpeechRec) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => SpeechRec;
    webkitSpeechRecognition?: new () => SpeechRec;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function pickBrowserVoice(voices: SpeechSynthesisVoice[]) {
  const score = (v: SpeechSynthesisVoice) => {
    const n = v.name.toLowerCase();
    let s = 0;
    if (/en[-_]?us/i.test(v.lang)) s += 4;
    else if (v.lang.toLowerCase().startsWith("en")) s += 2;
    if (/neural|natural|premium|enhanced|google/i.test(n)) s += 5;
    if (/samantha|karen|moira|tessa|victoria|zira|siri|aria|jenny|female/i.test(n)) s += 4;
    if (/male|david|daniel|alex|fred/i.test(n)) s -= 3;
    return s;
  };
  return [...voices].sort((a, b) => score(b) - score(a))[0] ?? null;
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(blob);
  });
}

function rmsFrom(buf: Uint8Array) {
  let sum = 0;
  for (let i = 0; i < buf.length; i++) {
    const v = ((buf[i] ?? 128) - 128) / 128;
    sum += v * v;
  }
  return Math.sqrt(sum / Math.max(buf.length, 1));
}

export function useCloverVoice() {
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recRef = useRef<SpeechRec | null>(null);
  const mediaRecRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const rafRef = useRef(0);
  const listenGen = useRef(0);
  const deliveredRef = useRef(false);
  const bargeRef = useRef(false);
  const speakingRef = useRef(false);
  const liveRef = useRef(false);
  const skipRef = useRef(false);
  const holdOptsRef = useRef<ListenOpts | null>(null);

  useEffect(() => {
    const sr = !!getSpeechRecognition();
    const rec =
      typeof window !== "undefined" &&
      typeof MediaRecorder !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia;
    setMicSupported(sr || rec);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const killRaf = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  };

  const ensureContext = async () => {
    if (typeof window === "undefined") return null;
    const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    if (!ctxRef.current) ctxRef.current = new Ctx();
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    return ctxRef.current;
  };

  const ensureStream = useCallback(async () => {
    const existing = streamRef.current;
    if (existing && existing.getAudioTracks().some((t) => t.readyState === "live")) {
      setMicError(null);
      return existing;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError("This browser has no microphone access.");
      return null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      streamRef.current = stream;
      setMicError(null);
      const ctx = await ensureContext();
      if (ctx) {
        try {
          sourceRef.current?.disconnect();
        } catch {
          /* ignore */
        }
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        src.connect(analyser);
        sourceRef.current = src;
        analyserRef.current = analyser;
      }
      return stream;
    } catch {
      setMicError("Allow the microphone so Clover can hear you.");
      return null;
    }
  }, []);

  const unlock = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!audioRef.current) audioRef.current = new Audio();
    const silent =
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";
    const a = audioRef.current;
    a.src = silent;
    a.volume = 0;
    void a
      .play()
      .then(() => {
        a.pause();
        a.volume = 1;
      })
      .catch(() => {
        a.volume = 1;
      });
    void ensureContext();
    void ensureStream();
  }, [ensureStream]);

  const stopSpeak = useCallback(() => {
    bargeRef.current = false;
    try {
      audioRef.current?.pause();
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  const releaseMic = useCallback(() => {
    listenGen.current += 1;
    killRaf();
    try {
      recRef.current?.abort?.();
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
    recRef.current = null;
    try {
      if (mediaRecRef.current?.state === "recording") mediaRecRef.current.stop();
    } catch {
      /* ignore */
    }
    mediaRecRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    try {
      sourceRef.current?.disconnect();
    } catch {
      /* ignore */
    }
    sourceRef.current = null;
    analyserRef.current = null;
    void ctxRef.current?.close();
    ctxRef.current = null;
    setListening(false);
  }, []);

  const stopListen = useCallback(() => {
    listenGen.current += 1;
    killRaf();
    try {
      recRef.current?.abort?.();
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
    recRef.current = null;
    try {
      if (mediaRecRef.current?.state === "recording") mediaRecRef.current.stop();
    } catch {
      /* ignore */
    }
    mediaRecRef.current = null;
    setListening(false);
  }, []);

  const speakBrowser = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        resolve();
        return;
      }
      const run = () => {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "en-US";
        utter.rate = 0.92;
        utter.pitch = 1.06;
        const voice = pickBrowserVoice(window.speechSynthesis.getVoices());
        if (voice) utter.voice = voice;
        utter.onend = () => {
          setSpeaking(false);
          resolve();
        };
        utter.onerror = () => {
          setSpeaking(false);
          resolve();
        };
        setSpeaking(true);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      };
      const voices = window.speechSynthesis.getVoices();
      if (voices.length) {
        run();
        return;
      }
      const t = window.setTimeout(run, 400);
      window.speechSynthesis.onvoiceschanged = () => {
        window.clearTimeout(t);
        window.speechSynthesis.onvoiceschanged = null;
        run();
      };
    });
  }, []);

  const watchBargeIn = useCallback(
    (onBarge: () => void) => {
      bargeRef.current = true;
      const analyser = analyserRef.current;
      if (!analyser) return;
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const startAt = performance.now();
      let loudSince: number | null = null;
      const tick = () => {
        if (!bargeRef.current) return;
        analyser.getByteTimeDomainData(buf);
        const now = performance.now();
        if (now - startAt < 550) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        const rms = rmsFrom(buf);
        if (rms > BARGE_RMS) {
          if (loudSince == null) loudSince = now;
          if (now - loudSince > BARGE_HOLD_MS) {
            bargeRef.current = false;
            onBarge();
            return;
          }
        } else {
          loudSince = null;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [],
  );

  const speak = useCallback(
    async (text: string) => {
      stopSpeak();
      if (!text.trim()) return false;
      setSpeaking(true);
      speakingRef.current = true;
      skipRef.current = true;
      let settled = false;
      let barged = false;
      const finishSpeak = () => {
        if (settled) return;
        settled = true;
        bargeRef.current = false;
        speakingRef.current = false;
        skipRef.current = barged ? false : false;
        setSpeaking(false);
      };

      await new Promise<void>((resolve) => {
        const done = () => {
          try {
            audioRef.current?.pause();
          } catch {
            /* ignore */
          }
          if (typeof window !== "undefined") window.speechSynthesis?.cancel();
          finishSpeak();
          resolve();
        };
        watchBargeIn(() => {
          barged = true;
          skipRef.current = false;
          done();
        });

        void (async () => {
          try {
            const res = await speakClover({ data: { text: text.slice(0, 800) } });
            if (settled) return;
            if (res.ok) {
              const url = `data:audio/mpeg;base64,${res.audio}`;
              const audio = audioRef.current ?? new Audio();
              audioRef.current = audio;
              audio.volume = 1;
              audio.src = url;
              audio.onended = done;
              audio.onerror = done;
              try {
                await audio.play();
              } catch {
                done();
              }
              return;
            }
          } catch {
            /* browser voice */
          }
          if (settled) return;
          await speakBrowser(text);
          done();
        })();
      });
      return barged;
    },
    [speakBrowser, stopSpeak, watchBargeIn],
  );

  const startListen = useCallback(
    (opts: ListenOpts) => {
      stopListen();
      const gen = listenGen.current;
      deliveredRef.current = false;
      const deliver = (text: string) => {
        if (gen !== listenGen.current || deliveredRef.current) return;
        if (speakingRef.current || skipRef.current) return;
        const clean = text.trim();
        if (clean.length < 2) return;
        deliveredRef.current = true;
        opts.onInterim("");
        opts.onResult(clean);
      };
      const finish = (got: boolean) => {
        if (gen !== listenGen.current) return;
        setListening(false);
        opts.onEnd(got || deliveredRef.current);
      };

      void (async () => {
        const stream = await ensureStream();
        if (gen !== listenGen.current) return;
        if (!stream) {
          finish(false);
          return;
        }
        setListening(true);

        const Ctor = getSpeechRecognition();
        let srFinal = "";
        if (Ctor) {
          try {
            const rec = new Ctor();
            rec.continuous = true;
            rec.interimResults = true;
            rec.lang = "en-US";
            rec.maxAlternatives = 1;
            rec.onresult = (ev) => {
              if (gen !== listenGen.current) return;
              let interim = "";
              let finalText = "";
              for (let i = ev.resultIndex; i < ev.results.length; i++) {
                const r = ev.results[i];
                if (!r) continue;
                if (r.isFinal) finalText += r[0]?.transcript ?? "";
                else interim += r[0]?.transcript ?? "";
              }
              if (finalText) srFinal += `${srFinal ? " " : ""}${finalText.trim()}`;
              const live = `${srFinal}${interim ? (srFinal ? " " : "") + interim : ""}`.trim();
              if (live) opts.onInterim(live);
            };
            rec.onerror = (e) => {
              if (e.error === "aborted" || e.error === "no-speech") return;
              if (e.error === "not-allowed" || e.error === "service-not-allowed") {
                setMicError("Allow the microphone so Clover can hear you.");
              }
            };
            rec.onend = () => {
              recRef.current = null;
            };
            recRef.current = rec;
            rec.start();
          } catch {
            recRef.current = null;
          }
        }

        if (typeof MediaRecorder === "undefined") {
          if (!Ctor) finish(false);
          return;
        }

        const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
          ? "audio/webm;codecs=opus"
          : MediaRecorder.isTypeSupported("audio/webm")
            ? "audio/webm"
            : MediaRecorder.isTypeSupported("audio/mp4")
              ? "audio/mp4"
              : "";
        const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
        mediaRecRef.current = rec;
        const chunks: Blob[] = [];
        rec.ondataavailable = (e) => {
          if (e.data?.size) chunks.push(e.data);
        };
        rec.onstop = async () => {
          if (gen !== listenGen.current) return;
          if (deliveredRef.current) {
            finish(true);
            return;
          }
          if (srFinal.trim().length >= 2) {
            deliver(srFinal);
            finish(true);
            return;
          }
          if (!chunks.length) {
            finish(false);
            return;
          }
          try {
            opts.onInterim("Hearing you…");
            const blob = new Blob(chunks, { type: rec.mimeType || mime || "audio/webm" });
            if (blob.size < 800) {
              finish(false);
              return;
            }
            const dataUrl = await blobToDataUrl(blob);
            const transcribed = await transcribeClover({ data: { audioDataUrl: dataUrl } });
            if (gen !== listenGen.current) return;
            if (transcribed.ok && transcribed.text.trim().length >= 2) {
              deliver(transcribed.text);
              finish(true);
            } else {
              finish(false);
            }
          } catch {
            finish(false);
          }
        };

        rec.start(250);
        const analyser = analyserRef.current;
        const buf = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
        const startedAt = Date.now();
        let spoke = false;
        let lastVoice = Date.now();

        const tick = () => {
          if (gen !== listenGen.current) return;
          if (deliveredRef.current) {
            try {
              if (rec.state === "recording") rec.stop();
            } catch {
              /* ignore */
            }
            try {
              recRef.current?.stop();
            } catch {
              /* ignore */
            }
            return;
          }
          const now = Date.now();
          if (buf && analyser) {
            analyser.getByteTimeDomainData(buf);
            const rms = rmsFrom(buf);
            if (rms > VOICE_RMS) {
              spoke = true;
              lastVoice = now;
            }
          }
          if ((spoke && now - lastVoice > SILENCE_MS) || now - startedAt > MAX_RECORD_MS || (!spoke && now - startedAt > WAIT_SPEECH_MS)) {
            try {
              if (rec.state === "recording") rec.stop();
            } catch {
              /* ignore */
            }
            try {
              recRef.current?.stop();
            } catch {
              /* ignore */
            }
            return;
          }
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      })();
    },
    [ensureStream, stopListen],
  );

  const holdListen = useCallback(
    (opts: ListenOpts) => {
      liveRef.current = true;
      holdOptsRef.current = opts;
      const loop = () => {
        if (!liveRef.current) return;
        startListen({
          onResult: opts.onResult,
          onInterim: opts.onInterim,
          onEnd: (got) => {
            opts.onEnd(got);
            if (liveRef.current && !speakingRef.current && !got) {
              window.setTimeout(loop, 160);
            }
          },
        });
      };
      loop();
    },
    [startListen],
  );

  useEffect(
    () => () => {
      stopSpeak();
      releaseMic();
    },
    [releaseMic, stopSpeak],
  );

  return {
    speak,
    stopSpeak,
    startListen,
    holdListen,
    stopListen,
    releaseMic,
    speaking,
    listening,
    micSupported,
    micError,
    unlock,
  };
}
