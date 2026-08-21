import { createServerFn } from "@tanstack/react-start";
import { MINERALS, findMineralByName, type Mineral, type Rarity } from "@/data/minerals";
import type { IdentifyResult } from "@/lib/types";

const RARITY_SET = new Set<Rarity>(["common", "uncommon", "rare", "epic", "legendary"]);

function asRarity(s: string | undefined, fallback: Rarity): Rarity {
  const v = (s || "").toLowerCase() as Rarity;
  return RARITY_SET.has(v) ? v : fallback;
}

export function mergeCatalog(raw: IdentifyResult): IdentifyResult {
  const hit = findMineralByName(raw.name);
  if (!hit) return raw;
  return {
    ...raw,
    mineralId: hit.id,
    name: hit.name,
    family: raw.family || hit.family,
    formula: raw.formula || hit.formula,
    hardness: raw.hardness || (hit.hardnessMin != null ? `${hit.hardnessMin}–${hit.hardnessMax}` : raw.hardness),
    luster: raw.luster || hit.luster[0],
    crystalSystem: raw.crystalSystem || hit.crystalSystem,
    streak: raw.streak || hit.streak,
    color: raw.color || hit.colors.slice(0, 3).join(", "),
    rarity: raw.rarity || hit.rarity,
    valueLow: raw.valueLow ?? hit.valueLow,
    valueHigh: raw.valueHigh ?? hit.valueHigh,
    keyFeatures: raw.keyFeatures.length ? raw.keyFeatures : hit.keyFeatures.slice(0, 4),
  };
}

export type FieldKey = {
  color?: string;
  hardness?: number;
  luster?: string;
  streak?: string;
  system?: string;
};

function scoreMineral(m: Mineral, key: FieldKey): number {
  let s = 0;
  if (key.color) {
    const c = key.color.toLowerCase();
    if (m.colors.some((x) => x.toLowerCase().includes(c) || c.includes(x.toLowerCase()))) s += 3;
    if (m.name.toLowerCase().includes(c)) s += 1;
  }
  if (key.hardness != null && m.hardnessMin != null && m.hardnessMax != null) {
    if (key.hardness >= m.hardnessMin - 0.5 && key.hardness <= m.hardnessMax + 0.5) s += 3;
    else if (Math.abs(key.hardness - (m.hardnessMin + m.hardnessMax) / 2) <= 1.5) s += 1;
  }
  if (key.luster) {
    const l = key.luster.toLowerCase();
    if (m.luster.some((x) => x.toLowerCase().includes(l))) s += 2;
  }
  if (key.streak) {
    const st = key.streak.toLowerCase();
    if (m.streak.toLowerCase().includes(st) || st.includes(m.streak.toLowerCase().split(" ")[0] || "___")) s += 2;
  }
  if (key.system) {
    if (m.crystalSystem.toLowerCase().includes(key.system.toLowerCase())) s += 2;
  }
  return s;
}

export function matchFieldKey(key: FieldKey): IdentifyResult[] {
  const ranked = MINERALS.map((m) => ({ m, score: scoreMineral(m, key) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  if (!ranked.length) return [];
  const top = ranked[0].score;
  return ranked.map(({ m, score }) => mineralToResult(m, Math.max(0.28, Math.min(0.92, (score / Math.max(top, 1)) * 0.78)), "field-key"));
}

export function mineralToResult(m: Mineral, confidence: number, source: IdentifyResult["source"]): IdentifyResult {
  return {
    name: m.name,
    mineralId: m.id,
    family: m.family,
    formula: m.formula,
    confidence,
    rarity: m.rarity,
    hardness: m.hardnessMin != null ? `${m.hardnessMin}${m.hardnessMax !== m.hardnessMin ? `–${m.hardnessMax}` : ""}` : undefined,
    luster: m.luster[0],
    crystalSystem: m.crystalSystem,
    streak: m.streak,
    color: m.colors.slice(0, 3).join(", "),
    valueLow: m.valueLow,
    valueHigh: m.valueHigh,
    fieldNotes: m.blurb,
    keyFeatures: m.keyFeatures.slice(0, 4),
    alternatives: m.similar.slice(0, 3).map((s, i) => ({ name: s.name, confidence: Math.max(0.15, confidence - 0.18 - i * 0.08) })),
    notGeological: false,
    source,
  };
}

function extractJson(text: string): Record<string, unknown> | null {
  const fenced = text.match(/```json\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

const CATALOG = MINERALS.map((m) => m.name).join(", ");

export const identifySpecimen = createServerFn({ method: "POST" })
  .validator((input: { imageDataUrl: string; notes?: string; locality?: string }) => input)
  .handler(async ({ data }): Promise<{ ok: true; result: IdentifyResult } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available in this environment." };

    const prompt = `You are a professional mineralogist assisting a field rockhound.
Identify the rock, mineral, or fossil in the photo.
Locality hint: ${data.locality || "unknown"}. Collector notes: ${data.notes || "none"}.
Prefer a common name from this catalog when it reasonably fits: ${CATALOG}.
If the image is not geological, say so.
Return ONLY compact JSON with keys:
name, scientificName, family, formula, confidence (0-1), rarity (common|uncommon|rare|epic|legendary),
hardness, luster, crystalSystem, streak, color, valueLow, valueHigh, fieldNotes (2-3 field sentences),
keyFeatures (array of strings), alternatives (array of {name, confidence}), notGeological (boolean).
Never invent certainty. If unsure, lower confidence and list alternatives.`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: data.imageDataUrl } },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return { ok: false, error: `Identification failed (${res.status}). ${t.slice(0, 140)}` };
    }

    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = body.choices?.[0]?.message?.content ?? "";
    const parsed = extractJson(text);
    if (!parsed) return { ok: false, error: "The model returned an unreadable report. Try another photo." };

    const altsRaw = Array.isArray(parsed.alternatives) ? parsed.alternatives : [];
    const result: IdentifyResult = mergeCatalog({
      name: String(parsed.name || "Unknown"),
      scientificName: parsed.scientificName ? String(parsed.scientificName) : undefined,
      family: String(parsed.family || "Undetermined"),
      formula: parsed.formula ? String(parsed.formula) : undefined,
      confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0.4)),
      rarity: asRarity(String(parsed.rarity || ""), "common"),
      hardness: parsed.hardness ? String(parsed.hardness) : undefined,
      luster: parsed.luster ? String(parsed.luster) : undefined,
      crystalSystem: parsed.crystalSystem ? String(parsed.crystalSystem) : undefined,
      streak: parsed.streak ? String(parsed.streak) : undefined,
      color: parsed.color ? String(parsed.color) : undefined,
      valueLow: Number.isFinite(Number(parsed.valueLow)) ? Number(parsed.valueLow) : undefined,
      valueHigh: Number.isFinite(Number(parsed.valueHigh)) ? Number(parsed.valueHigh) : undefined,
      fieldNotes: String(parsed.fieldNotes || ""),
      keyFeatures: Array.isArray(parsed.keyFeatures) ? parsed.keyFeatures.map(String).slice(0, 6) : [],
      alternatives: altsRaw.slice(0, 4).map((a) => {
        const o = a as { name?: string; confidence?: number };
        return { name: String(o.name || "alt"), confidence: Number(o.confidence) || 0.2 };
      }),
      notGeological: Boolean(parsed.notGeological),
      source: "ai",
    });

    return { ok: true, result };
  });

export type CloverCompanion = {
  name: string;
  level: number;
  mood: string;
  energy: number;
  streak: number;
  todaysFinds: number;
  collection: string[];
};

export const askClover = createServerFn({ method: "POST" })
  .validator(
    (input: {
      question: string;
      history?: { role: "user" | "assistant"; text: string }[];
      companion?: CloverCompanion;
      mode?: "voice" | "text";
    }) => input,
  )
  .handler(
    async ({
      data,
    }): Promise<
      { ok: true; text: string; logFind: boolean; findDetails: string | null } | { ok: false; error: string }
    > => {
      const apiKey = process.env.XAI_API_KEY;
      if (!apiKey) return { ok: false, error: "Clover is offline in this environment." };

      const q = data.question.trim().slice(0, 800);
      if (!q) return { ok: false, error: "Ask a field question first." };

      const c = data.companion;
      const name = (c?.name || "explorer").slice(0, 40);
      const voice = data.mode !== "text";
      const collection = (c?.collection ?? []).slice(0, 16).join(", ") || "none yet";
      const stateBits = c
        ? [
            `User's name: ${name}.`,
            `Companion level: ${c.level}. Mood: ${c.mood}. Energy: ${c.energy}/100.`,
            `Exploration streak: ${c.streak} consecutive days.`,
            `Specimens found today: ${c.todaysFinds}.`,
            `Cabinet: ${collection}.`,
          ].join(" ")
        : `User's name: ${name}.`;

      const systemPrompt = voice
        ? `You are Clover, a living field companion inside RockHound-GO. This is a live spoken conversation, like talking on a trail.

Stay on the thread. If they interrupt, follow the new thought. Refer back to minerals, tests, and places they already mentioned. Do not restart. Do not tell them to tap or type.

Voice: unhurried, sharp, a friend who knows rocks. Contractions. No markdown, bullets, asterisks, or emoji. Never say you are an AI.

Only state geology you are sure of. If unsure, say you'd want a test or a guide. Never invent legal collecting sites, prices, or rarity percentages. Never invent finds that are not in this conversation or the cabinet.

Two to four short spoken sentences — coherent, not a lecture. About one turn in three, ask a useful follow-up.

Logging: only if they clearly want a specimen recorded. Then log_find true and put their description in find_details. Casual talk is not logging.

${stateBits}`
        : `You are Clover, the field AGI inside RockHound-GO. Voice: concise, scientific, practical, no hype. Help with mineral ID tests, locality etiquette, packing lists, and geology. Prefer Mohs, streak, cleavage, and acid tests. Never invent a locality as legal if you are unsure — say to verify land status. Keep answers under 140 words unless asked for more. No emoji.

If they want a specimen recorded, set log_find true and copy the description into find_details; otherwise log_find false and find_details null.

${stateBits}`;

      const history = (data.history ?? []).slice(-16).map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text.slice(0, 800),
      }));

      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: voice ? 320 : 420,
          temperature: voice ? 0.62 : 0.55,
          messages: [
            { role: "system", content: systemPrompt },
            ...history,
            {
              role: "user",
              content: `${q}\n\nRespond as Clover. Output ONLY JSON: {"reply":"<what you say>","log_find":false,"find_details":null}`,
            },
          ],
        }),
      });

      if (!res.ok) return { ok: false, error: `Clover could not answer (${res.status}).` };
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const raw = body.choices?.[0]?.message?.content?.trim() || "";
      const parsed = extractJson(raw);
      const reply = String(parsed?.reply || raw || `Hey ${name}. What did you find today?`).trim();
      const detailsRaw = parsed?.find_details;
      const details =
        detailsRaw != null && String(detailsRaw).trim() && String(detailsRaw).trim().toLowerCase() !== "null"
          ? String(detailsRaw).slice(0, 400)
          : null;
      const logFind = Boolean(parsed?.log_find) && Boolean(details);
      return { ok: true, text: reply.slice(0, 900), logFind, findDetails: details };
    },
  );
