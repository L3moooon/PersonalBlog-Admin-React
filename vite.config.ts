import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import viteCompression from 'vite-plugin-compression';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const target = env.VITE_API_BASE_URL;
  return {
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(__dirname, 'src/assets/svg')], // 指定需要缓存的图标文件夹
        symbolId: 'icon-[dir]-[name]', // 指定symbolId格式
        svgoOptions: {
          plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: ['fill', 'stroke'] },
            },
          ],
        },
      }),
      viteCompression({
        algorithm: 'gzip', // 压缩算法
        threshold: 10240, // 文件大于10KB才压缩
        deleteOriginFile: false, // 不删除原文件
      }),
      visualizer({
        open: true, // 构建后自动打开分析页面
        filename: 'stats.html', // 分析文件路径
        gzipSize: true, // 显示gzip压缩后的大小
        brotliSize: true, // 显示brotli压缩后的大小
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      open: true,
      port: 5174,
      headers: {
        'Cross-Origin-Opener-Policy': 'cross-origin',
      },
      proxy: {
        '/admin': {
          target,
          changeOrigin: true,
        },
        '/public': {
          target,
          changeOrigin: true,
        },
        '/external': {
          target: 'https://v1.jinrishici.com', // 外部目标地址
          changeOrigin: true,
          rewrite: path => path.replace(/^\/external/, ''), // 重写路径为空
        },
        //本地开发环境显示oss图片
        '/images': {
          target: 'https://oss.willisblog.cn',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
