export const config = { runtime: "edge" };

const EVO_BASE =
  process.env.EVO_API_URL ?? "https://evo-integracao-api.w12app.com.br";

export default async function handler(request: Request) {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const dns = process.env.EVO_API_DNS;
  const key = process.env.EVO_API_KEY;

  if (!dns || !key) {
    return Response.json(
      { error: "EVO API credentials not configured" },
      { status: 500 }
    );
  }

  const incoming = new URL(request.url);
  const suffix = incoming.pathname.replace(/^\/api\/evo\/?/, "");
  const target = new URL(`/api/v1/${suffix}`, EVO_BASE);
  target.search = incoming.search;

  const auth = btoa(`${dns}:${key}`);
  const upstream = await fetch(target.toString(), {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });

  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
    },
  });
}
