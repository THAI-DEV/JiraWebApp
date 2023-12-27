import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  define: {
    __ADMIN_USER__: JSON.stringify('admin'),
    __ADMIN_PASSWORD__: JSON.stringify('admin1234'),
    __BUILD_DATE__: new Date(),
    __BUILD_BY__: JSON.stringify('DECH'),
  },
});
