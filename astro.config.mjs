import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 배포 도메인. 호스팅을 연결한 뒤에도 canonical/sitemap 기준이 되므로 정확해야 한다.
export default defineConfig({
  site: 'https://blog.casthouse.co',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
