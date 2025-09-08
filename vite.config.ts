import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/Hive/" : "/", 
  build: {
    chunkSizeWarningLimit: 1200,
  },
}));
