import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This tells Vite to listen on all network interfaces (0.0.0.0)
    port: 5173, // Ensure this matches the EXPOSE and -p mapping in Dockerfile/run command
    // Optional: for better hot-reloading stability on some Docker/OS setups
    watch: {
      usePolling: true
    }
  },
})
