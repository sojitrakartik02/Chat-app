import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://chat-app-9dat.onrender.com",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
  base: "/",
});
