// @ts-check
import { defineConfig } from 'astro/config';

// 通过环境变量 BASE_PATH 控制二级目录部署
// 不设置或为空：https://域名/index.html
// 设置为 /mschf：https://域名/mschf/index.html
const basePath = process.env.BASE_PATH || '';

// https://astro.build/config
export default defineConfig({
  base: basePath || undefined,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
