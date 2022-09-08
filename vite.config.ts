import { resolve } from "path";
import { defineConfig } from "vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({ sassVariables: "src/assets/quasar-variables.sass" }),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
      "~": resolve(__dirname, "src"),
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    // reportCompressedSize: true,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/")) {
            // Set the NPM package
            const modules = ["quasar", "@quasar", "vue", "@vue"];
            const chunk = modules.find((module) => id.includes(`/node_modules/${module}`));
            return chunk ? `vendor-${chunk}` : "vendor";
          }
        },
      },
    },
  },
});
