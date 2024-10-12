import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

export default defineConfig(({}) => {
  dotenv.config();
  const { VITE_BACKEND_PORT, VITE_BACKEND_NAME, VITE_BACKEND_PROTOCOL } =
    process.env;
  const protocol =
    VITE_BACKEND_PROTOCOL === "https" || VITE_BACKEND_PROTOCOL === "http"
      ? VITE_BACKEND_PROTOCOL
      : "http";
  const VITE_BACKEND_URL = `${protocol}://${VITE_BACKEND_NAME}:${VITE_BACKEND_PORT}`;
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: VITE_BACKEND_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    define: {
      "import.meta.env.VITE_BACKEND_PORT": process.env.VITE_BACKEND_PORT,
    },
  };
});
