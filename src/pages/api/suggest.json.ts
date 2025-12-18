// src/pages/api/suggest.json.ts
import type { APIRoute } from "astro";

type SuggestRequest = {
  term?: string;
  context?: {
    industry?: string;
    role?: string;
  };
};

function normalize(s?: string) {
  return (s ?? "").trim();
}

function safeJson(body: string) {
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function buildNeutralDefinition(termRaw: string, industry?: string, role?: string) {
  const term = termRaw || "the term";
  const ctxBits = [normalize(industry), normalize(role)].filter(Boolean);
  const ctx = ctxBits.length ? ` (context: ${ctxBits.join(" · ")})` : "";

  // Neutral, industry-agnostic, non-normative (avoid "must/always")
  return [
    `${term} is a clearly scoped concept used to describe a specific meaning that can be shared across people, tools, and documents${ctx}.`,
    `It includes the minimum attributes needed to distinguish it from similar concepts, and it avoids adding policy, obligations, or expanded scope.`,
  ].join(" ");
}

export const POST: APIRoute = async ({ request }) => {
  const raw = await request.text();
  const data = safeJson(raw) as SuggestRequest | null;

  const term = normalize(data?.term);
  const industry = normalize(data?.context?.industry);
  const role = normalize(data?.context?.role);

  // Fallback-first: deterministic suggestion
  const suggestion = buildNeutralDefinition(term || "A shared definition", industry, role);

  return new Response(
    JSON.stringify({
      ok: true,
      mode: "fallback",
      suggestion,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
