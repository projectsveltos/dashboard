import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

const basenameProd = "/";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? basenameProd : "",
    plugins: [
      react(),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.tsx"],
        fix: true,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : "",
      },
    },
  };
});
