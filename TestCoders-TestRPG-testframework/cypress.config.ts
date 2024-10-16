import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*/*.{js,jsx,ts,tsx}",
    baseUrl: "https://test-rpg.vercel.app/"
  },

  chromeWebSecurity: false,
  screenshotsFolder: "cypress/e2e/VisualRegression/screenshots"

});
