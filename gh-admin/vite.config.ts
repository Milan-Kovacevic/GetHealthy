import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
