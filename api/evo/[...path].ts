const EVO_BASE = (
  process.env.EVO_API_URL ?? "https://evo-integracao-api.w12app.com.br"
).replace(/\/$/, "");

export const config = { runtime: "edge" };

function targetUrl(request: Request): string {
  const incoming = new URL(request.url);
  const suffix = incoming.pathname.replace(/^\/api\/evo\/?/, "");
  return `${EVO_BASE}/api/v1/${suffix}${incoming.search}`;
}

export default async function handler(request: Request): Promise<Response> {
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

  const auth = btoa(`${dns}:${key}`);
  const target = targetUrl(request);
  const cacheKey = new Request(target, { method: "GET" });

  try {
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;
  } catch {
    // Cache API may be unavailable outside Edge.
  }

  const upstream = await fetch(target, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
    },
  });

  const body = await upstream.text();
  const response = new Response(body, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
      "Cache-Control": upstream.ok
        ? "s-maxage=300, stale-while-revalidate=600"
        : "no-store",
    },
  });

  if (upstream.ok) {
    try {
      await caches.default.put(cacheKey, response.clone());
    } catch {
      // ignore cache write failures
    }
  }

  return response;
}
