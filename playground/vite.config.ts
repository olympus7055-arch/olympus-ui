import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        modules: {
            localsConvention: 'camelCase', 
            generateScopedName: '[name]__[local]___[hash:base64:5]'
        },
        preprocessorOptions: {
            scss: {
                // 弃用警告
                silenceDeprecations: ['import', 'legacy-js-api'],
                // 完全静默所有警告
                quietDeps: true,
                // 使用新版API
                api: 'modern-compiler'
            }
        }
    }
});