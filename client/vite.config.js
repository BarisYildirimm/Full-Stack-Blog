import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Vercel'de kök klasör için doğru yapı
  build: {
    outDir: "dist", // Build çıktılarının dizini
  },
  server: {
    proxy: {
      "/api": {
        target:
          "https://full-stack-blog-5yxj1g3fe-barisyildirimms-projects.vercel.app/?vercelToolbarCode=qgL07BSWegcp1MK", // Backend adresi
        changeOrigin: true, // Cross-site sorunlarını çözer
        secure: true, // HTTPS kullanıyorsanız true
      },
    },
  },
});
