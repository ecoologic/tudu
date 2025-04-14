/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// @ts-expect-error - vite-plugin-eslint types are not properly exported in package.json
import eslint from "vite-plugin-eslint";

const __dirname = path.resolve();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    eslint({
      include: ["src/**/*.ts", "src/**/*.tsx"],
      cache: false,
      fix: true,
      lintOnStart: false, // Disable linting on start to avoid redundancy
      failOnError: false,
      failOnWarning: false,
    })
  ],
  css: {
    postcss: {
      map: true
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    exclude: [".trunk/**/*", "node_modules/**/*"],
  },
});
