import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false
  },
  plugins: [
    react(),
    obfuscatorPlugin({
      apply: "build",
      include: ["src/*.jsx", "src/*.js"],
      exclude: [/node_modules/],
      options: {
        compact: true,
        disableConsoleOutput: true,
        debugProtection: true,
        selfDefending: true,
        simplify: true,
        log: false,
      }
    })
  ],
})
