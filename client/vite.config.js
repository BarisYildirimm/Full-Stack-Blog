import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Kök klasör ayarı
  build: {
    outDir: "dist", // Frontend çıktılarının dizini
  },
  server: {
    proxy: {
      "/api": {
        target: "https://full-stack-blog-7keh.onrender.com", // Backend API sunucusu
        changeOrigin: true,
        secure: true, // HTTPS kullanmıyorsanız false yapın
      },
    },
  },
});
