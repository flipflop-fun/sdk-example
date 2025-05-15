import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer'
    }
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    },
    force: true,
    include: [
      '@solana/web3.js',
      '@solana/spl-token',
      '@solana/spl-token-metadata',
      '@flipflop-sdk/tools',
      'buffer'
    ],
    exclude: [
      '@flipflop-sdk/tools'
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/@flipflop-sdk/tools/**']
    },
    hmr: {
      overlay: false
    }
  }
})
