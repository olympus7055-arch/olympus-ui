import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 1. 引入 path 模块

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'camelCase', 
            generateScopedName: '[name]__[local]___[hash:base64:5]'
        },
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ['import', 'legacy-js-api'],
                quietDeps: true,
                api: 'modern-compiler'
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../packages/src'),
        }
    }
});