import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    ViteComponents({
      customComponentResolvers: [ElementPlusResolver()],
    }),
  ],
  // resolve: {
  //   alias: {
  //     '@models': path.resolve(__dirname, 'src/models'),
  //     '@services': path.resolve(__dirname, 'src/services'),
  //     '@components': path.resolve(__dirname, 'src/components')
  //   },
  // },
});
