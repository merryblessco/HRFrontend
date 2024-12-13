// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // Customize Ant Design theme here
          "primary-color": "#000", // Change primary color to green
          "link-color": "#1DA57A", // Change link color to green
          "border-radius-base": "4px", // Change border radius
          // Add more customizations here
        },
        javascriptEnabled: true,
      },
    },
  },
});
