import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig } from 'vite';

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
    'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
    'process.env.FIREBASE_AUTH_DOMAIN' : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
    'process.env.FIREBASE_STORAGE_BUCKET' : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
    'process.env.FIREBASE_MESSAGING_SENDER_ID' : JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    'process.env.FIREBASE_APP_ID' : JSON.stringify(process.env.FIREBASE_APP_ID),

  },
  resolve: {
    alias: {
      process: "process/browser",
      // src: path.resolve(__dirname, 'src'),
    }
  },
})
