import { defineConfig, loadEnv, type ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const evoTarget =
    env.EVO_API_URL || "https://evo-integracao-api.w12app.com.br";
  const evoAuth =
    env.EVO_API_DNS && env.EVO_API_KEY
      ? btoa(`${env.EVO_API_DNS}:${env.EVO_API_KEY}`)
      : "";

  const evoProxy: Record<string, ProxyOptions> = {
    "/api/evo": {
      target: evoTarget,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/evo/, "/api/v1"),
      configure(proxy) {
        proxy.on("proxyReq", (proxyReq) => {
          if (evoAuth) {
            proxyReq.setHeader("Authorization", `Basic ${evoAuth}`);
          }
        });
      },
    },
  };

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: { proxy: evoProxy },
    preview: { proxy: evoProxy },
  };
});
