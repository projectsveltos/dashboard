import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";
const basenameProd = "/";

export default defineConfig(({ command }) => {
  dotenv.config();
  const { VITE_BACKEND_PORT } = process.env;
  const VITE_BACKEND_URL = `http://localhost:${VITE_BACKEND_PORT}`;
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
