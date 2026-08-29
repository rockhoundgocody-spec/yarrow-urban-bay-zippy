import { useCallback, useEffect, useRef, useState } from "react";
import { askClover } from "@/lib/identify";
import { companionFromField, localCloverReply, parseLoggedFind, type CompanionState } from "@/lib/companion";
import { useField } from "@/lib/store";
import type { OrbState } from "@/components/orb/liquid-metal-orb";
import { useCloverVoice } from "@/components/orb/use-clover-voice";

const MAX_QUIET_TURNS = 6;

const REMARKS = [
  "Still here. What did you pick up?",
  "Name the rock. I'll take the lookalikes.",
  "No rush. The ground isn't going anywhere.",
  "I'm listening. Texture, streak, where you found it.",
];

const GREETINGS = (c: CompanionState) => {
  const hour = new Date().getHours();
  const time = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const pool = [
    `Good ${time}, ${c.name}. I'm Clover. Just talk — I'm listening.`,
    `Hey ${c.name}. I'm here. What are you seeing?`,
    `I'm with you. Tell me about the rock, or just think out loud.`,
  ];
  if (c.streak >= 7) pool.unshift(`Seven days in a row. That's a real streak. What's the plan this ${time}?`);
  else if (c.streak >= 3) pool.unshift(`Day ${c.streak} together. How's the ground treating you?`);
  if (c.mood === "radiant") pool.unshift("You logged a find today. Tell me about it — I want the texture, not the trophy.");
  if (c.mood === "drowsy") pool.unshift("No pressure. I'm just glad you opened the field kit.");
  return pool;
};

export function useCloverConversation() {
  const [phase, setPhase] = useState<OrbState>("idle");
  const [interim, setInterim] = useState("");
  const [line, setLine] = useState("");
  const activeRef = useRef(false);
  const phaseRef = useRef<OrbState>("idle");
  const quietTurnsRef = useRef(0);
  const voice = useCloverVoice();

  const displayName = useField((s) => s.displayName);
  const xp = useField((s) => s.xp);
  const streak = useField((s) => s.streak);
  const specimens = useField((s) => s.specimens);
  const companion = companionFromField({ displayName, xp, streak, specimens });

  const setOrbPhase = useCallback((next: OrbState) => {
    const y = typeof window !== "undefined" ? window.scrollY : 0;
    setPhase(next);
    if (typeof window === "undefined") return;
    const restore = () => {
      if (Math.abs(window.scrollY - y) > 1) window.scrollTo(0, y);
    };
    restore();
    requestAnimationFrame(restore);
    window.setTimeout(restore, 60);
    window.setTimeout(restore, 220);
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const beginListening = useCallback(() => {
    if (!activeRef.current) return;
    if (!voice.micSupported) {
      setOrbPhase("listening");
      return;
    }
    setInterim("");
    setOrbPhase("listening");
    voice.holdListen({
      onResult: (text) => {
        quietTurnsRef.current = 0;
        void sendRef.current?.(text, "voice");
      },
      onInterim: setInterim,
      onEnd: (got) => {
        if (!activeRef.current) return;
        if (got) return;
        if (voice.micError) return;
        setOrbPhase("listening");
      },
    });
  }, [voice, setOrbPhase]);

  const send = useCallback(
    async (raw: string, mode: "voice" | "text" = "voice") => {
      const question = raw.trim();
      if (!question || !activeRef.current) return;
      setInterim("");
      voice.stopListen();
      const push = useField.getState().pushClover;
      push({ role: "user", text: question });
      setOrbPhase("thinking");

      const history = useField
        .getState()
        .clover.slice(-17, -1)
        .map((m) => ({ role: m.role, text: m.text }));

      let reply = localCloverReply(question, companion);
      try {
        const res = await askClover({
          data: { question, history, companion, mode },
        });
        if (res.ok) {
          reply = res.text;
          if (res.logFind && res.findDetails) {
            const parsed = parseLoggedFind(res.findDetails);
            useField.getState().addSpecimen({
              name: parsed.name,
              mineralId: parsed.mineralId,
              family: parsed.family,
              formula: parsed.formula,
              rarity: parsed.rarity,
              confidence: 0.55,
              notes: res.findDetails,
              fieldNotes: "Logged by Clover from conversation.",
              source: "manual",
              disposition: "unknown",
              collected: false,
              leftInPlace: false,
              legalStatus: "unknown",
              ethicsPromptShown: false,
              userConfirmedLegalAccess: false,
              geoPrivacy: "hidden",
            });
            reply = `${reply} Logged ${parsed.name} to GeoDex.`;
          }
        }
      } catch {
        /* local reply already set */
      }

      if (!activeRef.current) return;
      push({ role: "assistant", text: reply });
      setLine(reply);
      setOrbPhase("speaking");
      const barged = await voice.speak(reply);
      if (!activeRef.current) return;
      window.setTimeout(
        () => {
          if (activeRef.current) beginListening();
        },
        barged ? 80 : 220,
      );
    },
    [beginListening, companion, voice, setOrbPhase],
  );

  const sendRef = useRef(send);
  sendRef.current = send;
  const remarkRef = useRef<() => Promise<void>>(async () => {});

  const start = useCallback(() => {
    activeRef.current = true;
    quietTurnsRef.current = 0;
    voice.unlock();
    const pool = GREETINGS(companion);
    const line = pool[Math.floor(Math.random() * pool.length)] ?? pool[0];
    const existing = useField.getState().clover;
    const opening =
      existing.length === 1 && existing[0]?.role === "assistant" ? existing[0].text : line;
    if (!(existing.length === 1 && existing[0]?.role === "assistant")) {
      useField.getState().pushClover({ role: "assistant", text: opening });
    }
    setLine(opening);
    setOrbPhase("speaking");
    void (async () => {
      await voice.speak(opening);
      if (!activeRef.current) return;
      window.setTimeout(() => {
        if (activeRef.current) beginListening();
      }, 280);
    })();
  }, [beginListening, companion, voice, setOrbPhase]);

  const end = useCallback(() => {
    activeRef.current = false;
    voice.stopListen();
    voice.stopSpeak();
    voice.releaseMic();
    setOrbPhase("idle");
    setInterim("");
    setLine("");
  }, [voice, setOrbPhase]);

  const speakRemark = useCallback(async () => {
    if (!activeRef.current) return;
    const remark = REMARKS[Math.floor(Math.random() * REMARKS.length)] ?? REMARKS[0];
    setLine(remark);
    setOrbPhase("speaking");
    await voice.speak(remark);
    if (!activeRef.current) return;
    window.setTimeout(() => {
      if (activeRef.current) beginListening();
    }, 280);
  }, [beginListening, voice, setOrbPhase]);
  remarkRef.current = speakRemark;

  const nudge = useCallback(() => {
    if (!activeRef.current) {
      start();
      return;
    }
    voice.stopSpeak();
    voice.unlock();
    quietTurnsRef.current = 0;
    beginListening();
  }, [beginListening, start, voice]);

  useEffect(
    () => () => {
      activeRef.current = false;
    },
    [],
  );

  const ensureLive = useCallback(() => {
    voice.unlock();
  }, [voice]);

  return {
    phase,
    interim,
    line,
    start,
    end,
    nudge,
    send,
    ensureLive,
    voiceSupported: voice.micSupported,
    micError: voice.micError,
    companion,
    open: phase !== "idle",
    beginListening,
  };
}
