import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // Required fields
    const { term, canonical, perspectives } = body;

    if (!term || !canonical) {
      return new Response(
        JSON.stringify({ error: "term and canonical are required" }),
        { status: 400 }
      );
    }

    // --- Notion Write ---
    const notionRes = await fetch(
      `https://api.notion.com/v1/pages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          parent: { database_id: process.env.NOTION_DATABASE_ID },
          properties: {
            Name: { title: [{ text: { content: term } }] },
            Canonical: { rich_text: [{ text: { content: canonical } }] },
            Perspectives: {
              rich_text: [
                {
                  text: {
                    content: JSON.stringify(perspectives || {})
                  }
                }
              ]
            }
          }
        })
      }
    );

    const data = await notionRes.json();

    if (!notionRes.ok) {
      return new Response(JSON.stringify({ error: data }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ success: true, notionId: data.id }),
      { status: 200 }
    );

  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
};
