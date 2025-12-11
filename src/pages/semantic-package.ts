import type { APIRoute } from "astro";

export const prerender = false;


export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const term = body.term;

        if (!term) {
            return new Response(JSON.stringify({ ok: false, error: "Missing term" }), { status: 400 });
        }

        //
        // 1) OPENAI – Semantic Engine Generation
        //
        const openAiResp = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are the WikiSure Semantic Engine. Generate structured semantic packages.",
                    },
                    {
                        role: "user",
                        content: `Generate a semantic package for the term: ${term}`,
                    },
                ],
            }),
        });

        const aiData = await openAiResp.json();
        const output = aiData.choices?.[0]?.message?.content || "No output";

        //
        // 2) WRITE TO NOTION — Canonical Semantic Storage
        //
        const notionResp = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28",
                Authorization: `Bearer ${import.meta.env.NOTION_API_TOKEN}`,
            },
            body: JSON.stringify({
                parent: { database_id: import.meta.env.NOTION_DB_SEMANTIC },
                properties: {
                    Term: {
                        title: [
                            {
                                text: { content: term },
                            },
                        ],
                    },
                    "Canonical Definition": {
                        rich_text: [
                            {
                                text: { content: output },
                            },
                        ],
                    },
                },
            }),
        });

        const notionData = await notionResp.json();

        //
        // 3) FINAL RESPONSE
        //
        return new Response(
            JSON.stringify({
                ok: true,
                term,
                semanticPackage: output,
                notionUrl: notionData.url,
            }),
            { status: 200 }
        );
    } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
    }
};