import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5000',
  //       secure: false,
  //     }
  //   }
  // },
  plugins: [react({
    include: "**/*.tsx",
  })],
  define: {
    // "process.env.API_BASE_URL": `"${process.env.API_BASE_URL}"`,
    // "process.env.VITE_FIREBASE_API_KEY": `"${process.env.VITE_FIREBASE_API_KEY}"`,
    // 'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
  },
  resolve: {
    alias: {
      process: "process/browser",
      // src: path.resolve(__dirname, 'src'),
    }
  },
})
