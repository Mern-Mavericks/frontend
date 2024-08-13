import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const backendUrl = process.env.VITE_API_URL || 'https://backend-five-theta-73.vercel.app';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
      '/users': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
