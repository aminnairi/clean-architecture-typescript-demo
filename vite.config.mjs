import tsc from "vite-plugin-tsc";

export default {
  root: "sources/infrastructure/web",
  plugins: [
    tsc()
  ],
  server: {
    port: 8000,
    host: "0.0.0.0"
  },
  preview: {
    port: 8000,
    host: "0.0.0.0"
  },
  build: {
    outDir: "../../../build",
    emptyOutDir: true
  }
}
