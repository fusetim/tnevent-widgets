// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: "https://fusetim.github.io",
  base: "/tnevent-widgets",
  integrations: [solidJs()]
});