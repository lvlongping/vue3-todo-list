import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
const CWD = process.cwd();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [resolve(CWD, 'src/assets/icons')],
      // Specify symbolId format
      symbolId: '[dir]-[name]',
    }),],
  resolve: {
    alias: {
      "@": '/src'
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/style/global.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  },
  optimizeDeps: {
    include: ['@vueuse/core', 'vuedraggable'],
  }
})
