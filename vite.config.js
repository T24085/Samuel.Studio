import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const chatProxy = {
  '/api/assistant-chat': {
    target: 'http://127.0.0.1:8787',
    changeOrigin: true,
  },
  '/api/chat-log': {
    target: 'http://127.0.0.1:8787',
    changeOrigin: true,
  },
}

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  server: {
    proxy: chatProxy,
  },
  preview: {
    proxy: chatProxy,
  },
}))
