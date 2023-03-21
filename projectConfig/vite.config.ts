import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { svgBuilder } from './src/plugins/svgBuilder';
import viteCompression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import vueJsx from '@vitejs/plugin-vue-jsx';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      svgBuilder('./src/assets/icon/'), // 这里已经将src/icons/svg/下的svg全部导入，无需再单独导入
      viteCompression(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less',
          }),
        ],
      }),
      PkgConfig(),
      OptimizationPersist(),
      vueJsx(),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/style/less/index.less";',
          modifyVars: {
            '@primary-color': '#2F54EB',
            '@border-radius-base': '4px',
            '@border-radius-sm': '4px',
            '@border-color-split': '#f6f7fb',
            '@border-color-base': '@alpha-font-assist-3',
            '@disabled-color': '@alpha-font-assist-1',
            '@disabled-bg': '@alpha-background-content',
            '@text-color': '@alpha-font-main',
            '@text-color-secondary': '@alpha-font-assist-1',
            '@font-size-base': '14px',
            '@menu-item-color': '@alpha-font-assist-1',
            '@menu-icon-margin-right': '13px',
            '@menu-inline-submenu-bg': '@alpha-white',
            '@menu-item-active-bg': '@alpha-blue-assist',
            '@menu-inline-toplevel-item-height': '54px',
            '@menu-item-height': '54px',
            '@btn-padding-horizontal-base': '16.5px',
            '@btn-padding-horizontal-lg': '16.5px',
            '@btn-danger-bg': '#F04438',
            '@btn-danger-border': '#F04438',
            '@table-border-radius-base': '8px',
            '@table-header-bg': '#f6f7fb',
            '@table-header-color': '#92959e',
            '@table-padding-vertical': '12px',
            '@tabs-card-height': '56px',
            '@tabs-card-gutter': '13px',
            '@tabs-card-head-background': '#ececee',
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: 8088,
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
  });
};
