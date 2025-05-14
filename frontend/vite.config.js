import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, path.resolve(__dirname, '..'), 'VITE_')
  
  return {
    plugins: [react()],
    envDir: path.resolve(__dirname, '..'),
    build: {
      rollupOptions: {
        external: []
      }
    }
  }
})
