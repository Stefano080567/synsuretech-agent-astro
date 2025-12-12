import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    return new Response(
      JSON.stringify({
        ok: true,
        agent: body.agent ?? "unknown",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Invalid JSON",
      }),
      { status: 400 }
    );
  }
};
