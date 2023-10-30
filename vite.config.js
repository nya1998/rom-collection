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
      include: ["src/pages/*.jsx"],
      exclude: [/node_modules/],
      debugger: true,
      options: {
        compact: true,
        disableConsoleOutput: true,
        debugProtection: true,
        simplify: true,
        selfDefending: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        identifierNamesGenerator: 'hexadecimal',
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.75,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 4,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        log: false,
      }
    })
  ],
})
