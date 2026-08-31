import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const evoTarget =
    env.EVO_API_URL || "https://evo-integracao-api.w12app.com.br";
  const evoAuth =
    env.EVO_API_DNS && env.EVO_API_KEY
      ? btoa(`${env.EVO_API_DNS}:${env.EVO_API_KEY}`)
      : "";

  const attachEvoAuth = (proxy: {
    on: (
      event: "proxyReq",
      listener: (proxyReq: { setHeader: (name: string, value: string) => void }) => void
    ) => void;
  }) => {
    proxy.on("proxyReq", (proxyReq) => {
      if (evoAuth) {
        proxyReq.setHeader("Authorization", `Basic ${evoAuth}`);
      }
    });
  };

  const evoProxy = {
    "/api/evo": {
      target: evoTarget,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api\/evo/, "/api/v1"),
      configure: attachEvoAuth,
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
