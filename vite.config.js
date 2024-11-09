import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy requests starting with /api to another server (e.g., backend on localhost:5000)
      "/api": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
