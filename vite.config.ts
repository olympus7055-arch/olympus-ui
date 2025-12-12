import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // <-- 需要引入 path 模块

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'camelCase'
        }
    },
    server: {
        port: 5173,
        host: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'packages/src'),
            // '@components': path.resolve(__dirname, 'packages/src/components'),
        }
    }
});
