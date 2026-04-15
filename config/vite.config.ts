import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,   // needed in Docker — binds to 0.0.0.0 instead of localhost
  },
})