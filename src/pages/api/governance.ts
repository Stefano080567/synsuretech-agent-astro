import type { APIRoute } from "astro";

/**
 * Deterministic governance logic for demo:
 * - PASS   → minor clarification
 * - FLAG   → moderate scope expansion
 * - REVISE → strong drift / normative override
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const canonical = String(body?.canonical ?? "").trim();
    const proposed  = String(body?.proposed  ?? "").trim();

    if (!canonical || !proposed) {
      return new Response(
        JSON.stringify({ ok: false, error: "Missing canonical or proposed text." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // --- Heuristics (simple, stable, industry-agnostic) ---
    const lenA = canonical.length || 1;
    const lenB = proposed.length;
    const lengthRatio = lenB / lenA;

    const normativeWords = ["must", "always", "shall", "without approval", "override"];
    const scopeWords = ["all systems", "every system", "processes", "globally", "any system"];

    const a = canonical.toLowerCase();
    const b = proposed.toLowerCase();

    const normativeHits = normativeWords.filter(w => b.includes(w));
    const scopeHits = scopeWords.filter(w => b.includes(w) && !a.includes(w));

    let decision: "PASS" | "FLAG" | "REVISE" = "PASS";
    const reasons: string[] = [];

    // --- Decision thresholds ---
    if (normativeHits.length > 0 || lengthRatio >= 1.8) {
      decision = "REVISE";
      reasons.push("Strong semantic drift or normative override detected.");
    } else if (scopeHits.length > 0 || lengthRatio >= 1.25) {
      decision = "FLAG";
      reasons.push("Potential scope expansion detected.");
    } else {
      decision = "PASS";
      reasons.push("Minor clarification within original scope.");
    }

    if (normativeHits.length) {
      reasons.push(`Normative language: ${normativeHits.join(", ")}`);
    }
    if (scopeHits.length) {
      reasons.push(`Scope expansion terms: ${scopeHits.join(", ")}`);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        decision,
        reasons,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message ?? "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
