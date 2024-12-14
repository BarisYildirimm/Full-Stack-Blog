import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Vercel'de kök klasör için doğru yapı
  build: {
    outDir: "dist", // Build çıktılarının dizini
  },
});
