import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite: el servidor de desarrollo abre en http://localhost:5173
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
});
