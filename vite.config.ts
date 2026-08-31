import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function readDotEnv(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};
  const out: Record<string, string> = {};
  for (const raw of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    out[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  return out;
}

function evoDevProxy(): Plugin {
  const env = {
    ...readDotEnv(path.resolve(process.cwd(), ".env")),
    ...readDotEnv(path.resolve(process.cwd(), ".env.local")),
  };
  const base = (
    env.EVO_API_URL || "https://evo-integracao-api.w12app.com.br"
  ).replace(/\/$/, "");
  const dns = env.EVO_API_DNS ?? "";
  const key = env.EVO_API_KEY ?? "";
  const auth =
    dns && key ? Buffer.from(`${dns}:${key}`).toString("base64") : "";
  const cache = new Map<
    string,
    { expires: number; status: number; type: string; body: string }
  >();
  const CACHE_MS = 5 * 60 * 1000;

  const middleware = (
    req: { url?: string },
    res: {
      statusCode: number;
      setHeader: (name: string, value: string) => void;
      end: (body: string) => void;
    },
    next: () => void
  ) => {
    const url = req.url ?? "";
    if (!url.startsWith("/api/evo")) {
      next();
      return;
    }

    if (!auth) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ error: "EVO API credentials not configured" })
      );
      return;
    }

    const incoming = new URL(url, "http://127.0.0.1");
    const suffix = incoming.pathname.replace(/^\/api\/evo/, "");
    const target = `${base}/api/v1${suffix}${incoming.search}`;
    const cached = cache.get(target);
    if (cached && cached.expires > Date.now()) {
      res.statusCode = cached.status;
      res.setHeader("Content-Type", cached.type);
      res.end(cached.body);
      return;
    }

    void (async () => {
      try {
        const upstream = await fetch(target, {
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${auth}`,
          },
        });
        const body = await upstream.text();
        const type =
          upstream.headers.get("content-type") ?? "application/json";
        if (upstream.ok) {
          cache.set(target, {
            expires: Date.now() + CACHE_MS,
            status: upstream.status,
            type,
            body,
          });
        }
        res.statusCode = upstream.status;
        res.setHeader("Content-Type", type);
        res.end(body);
      } catch {
        res.statusCode = 502;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Falha ao consultar a EVO" }));
      }
    })();
  };

  return {
    name: "evo-dev-proxy",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), evoDevProxy()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
