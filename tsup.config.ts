// tsup.config.ts
import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig({
    entry: ['src/index.ts'], // 注意：应该是 .ts 不是 .tsx
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react'],
    esbuildPlugins: [sassPlugin()],
});
