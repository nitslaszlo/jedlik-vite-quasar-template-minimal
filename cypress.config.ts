import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8080",
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/**/*.spec.*",
    supportFile: false,
  },
});
