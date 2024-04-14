import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      // remoteType: "module",
      name: 'auth-app',
      filename: "auth-app-entry.js",
      exposes: {
        "./App" : "./src/App.tsx",
        "./SignIn" : "./src/views/SignIn.tsx",
        "./SignUp" : "./src/views/SignUp.tsx",
      }, 
      shared: ["react", "react-dom"],
    }),
    tsconfigPaths(),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
  },
  preview: {
    host: 'localhost',
    port: 5001,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
})
