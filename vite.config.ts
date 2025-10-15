import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy':
        "frame-ancestors https://steuerberatung-pollmanns.de https://www.steuerberatung-pollmanns.de;"
    }
  },
  preview: {
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy':
        "frame-ancestors https://steuerberatung-pollmanns.de https://www.steuerberatung-pollmanns.de;"
    }
  }
})
