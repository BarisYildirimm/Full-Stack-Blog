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
        target: "https://eunike-backend.vercel.app", // Backend API sunucusu
        changeOrigin: true,
        secure: false, // HTTPS kullanmıyorsanız false yapın
      },
    },
  },
});
