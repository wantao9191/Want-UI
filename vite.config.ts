import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from "path";
import libCss from 'vite-plugin-libcss';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true
    }),
    libCss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', '.ts']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/libs/var.scss";'
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/libs'),
      name: 'Want-Ui',
      fileName: (format) => `Want-Ui.${format}.js`
    },
    cssCodeSplit:false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
