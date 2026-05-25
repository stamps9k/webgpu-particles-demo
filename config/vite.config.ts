import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  server: {
    port: 8080,
    host: true, // needed in Docker — binds to 0.0.0.0 instead of localhost
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  // Exclude the webgpu-particles library from optimization during dev so that I can debug.
  optimizeDeps: command === "serve" ? { exclude: ["webgpu-particles"] } : {},
}));
