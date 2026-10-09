import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const econverseProductsProxy = {
  '/api/products': {
    target: 'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos',
    changeOrigin: true,
    rewrite: () => '/produtos.json',
  },
}

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: econverseProductsProxy,
  },
  preview: {
    proxy: econverseProductsProxy,
  },
})
