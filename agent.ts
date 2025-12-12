import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  const type = url.searchParams.get("type") || "draft";

  return new Response(
    JSON.stringify({
      status: "ok",
      agent: type,
      message: `Agent '${type}' executed successfully`,
      result: {
        summary: "This is a live backend response.",
        timestamp: new Date().toISOString()
      }
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

