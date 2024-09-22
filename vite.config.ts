import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  resolve: {
    alias: { '@/': `${path.resolve(__dirname, 'src')}/` },
  },
  base: '/vue3-skeleton/',
  define: {
    'process.env': process.env,
  },
  plugins: [
    vue({ template: { transformAssetUrls } }),
    quasar({
      sassVariables: 'src/assets/scss/quasar-variables.sass',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
})
