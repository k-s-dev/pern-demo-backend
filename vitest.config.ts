// vitest.config.ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // Essential for backend testing
    setupFiles: ["./src/tests/vitest/setupFile.ts"],
    globalSetup: "./src/tests/vitest/globalSetup.ts",
    allowOnly: true,
  },
  resolve: {
    alias: {
      "#": path.resolve(__dirname),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
