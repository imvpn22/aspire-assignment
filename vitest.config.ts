import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/_tests/setup.d.ts"],
    include: ["src/_tests/**/*.test.{ts,tsx}"],
    globals: true,
  },
});
