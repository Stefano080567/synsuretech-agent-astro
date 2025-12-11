import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return new Response(JSON.stringify({
        ok: false,
        error: "OPENAI_API_KEY is missing in your environment."
      }), { status: 500 });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Agent task received!",
        task: body.task,
        apiKeyDetected: true
      }),
      { status: 200 }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500 }
    );
  }
};
