import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import i18nextLoader from "vite-plugin-i18next-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    i18nextLoader({
      paths: ["./locales"],
      namespaceResolution: "basename",
    }),
    react(),
  ],
});
