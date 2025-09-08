import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // you installed this one

export default defineConfig({
  plugins: [react()],
  base: "/", // dev runs at /
});
