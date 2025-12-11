import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// https://docs.astro.build/en/guides/deploy/vercel/
export default defineConfig({
  output: 'server',
  adapter: vercel(),
});
