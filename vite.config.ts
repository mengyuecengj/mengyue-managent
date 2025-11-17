import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: [
      vue(),

      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        }
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      svgLoader(),
      viteMockServe({
        mockPath: 'mock',               // mock 目录（你项目就是 mock）
        enable: command === 'serve',    // 开发环境启用（v3 使用 enable）
        watchFiles: true,               // 热更新 mock 文件（可选）
        logger: true                    // 打开日志，方便调试（可选）
      })
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      // sourcemap: command === 'build' ? false : 'inline',
      outDir: 'dist',
      assetsDir: 'assets',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: () => 'bundle',
          entryFileNames: 'static/js/[name].js',
          chunkFileNames: 'static/js/[name].js',
          assetFileNames: 'static/[ext]/[name].[ext]'
        }
      }
    },
    server: {
      port: 80,
      host: true,
      open: true,
      // proxy: {
      //   '/dev-api': {
      //     target: 'http://localhost:8080',
      //     changeOrigin: true,
      //     rewrite: (p) => p.replace(/^\/dev-api/, '')
      //   }
      // }
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removeal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
  }
});