import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/KaRem/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      Components: resolve(__dirname, "src/components"),
      Common: resolve(__dirname, "src/components/common"),
      Assets: resolve(__dirname, "src/assets"),
    },
  },
});
