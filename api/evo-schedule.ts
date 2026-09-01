const EVO_BASE = (
  process.env.EVO_API_URL ?? "https://evo-integracao-api.w12app.com.br"
).replace(/\/$/, "");

type VercelReq = { method?: string; url?: string };
type VercelRes = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body: string) => void;
};

async function proxyEvo(suffix: string, req: VercelReq, res: VercelRes) {
  try {
    if (req.method !== "GET") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Method not allowed" }));
      return;
    }

    const dns = process.env.EVO_API_DNS;
    const key = process.env.EVO_API_KEY;

    if (!dns || !key) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ error: "EVO API credentials not configured" })
      );
      return;
    }

    const incoming = new URL(req.url ?? "/", "http://localhost");
    const target = `${EVO_BASE}/api/v1/${suffix}${incoming.search}`;
    const auth = Buffer.from(`${dns}:${key}`).toString("base64");
    const upstream = await fetch(target, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });
    const body = await upstream.text();

    res.statusCode = upstream.status;
    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") ?? "application/json"
    );
    res.setHeader(
      "Cache-Control",
      upstream.ok ? "s-maxage=300, stale-while-revalidate=600" : "no-store"
    );
    res.end(body);
  } catch {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Falha ao consultar a EVO" }));
  }
}

export default async function handler(req: VercelReq, res: VercelRes) {
  await proxyEvo("activities/schedule", req, res);
}
