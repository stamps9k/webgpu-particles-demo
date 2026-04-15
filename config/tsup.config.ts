import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server.mts", "api"],
  format: ["esm"],
  platform: "node",
  bundle: false,
  outExtension() {
    return { js: ".mjs" };
  },
});