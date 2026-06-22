import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/'  →  Vercel + domínio customizado (nexus2027.jm.dev.com)
// base: '/nexus2027/'  →  GitHub Pages (subpath)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
