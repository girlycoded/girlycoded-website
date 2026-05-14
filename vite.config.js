import { defineConfig } from 'vite'
import { resolve } from 'path'
import ssiPlugin from "./plugins/ssi.js"
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        journal: resolve(__dirname, 'journal.html'),
		portfolio: resolve(__dirname, 'portfolio.html'),
		profile: resolve(__dirname, 'profile.html'),
		guestbook: resolve(__dirname, 'guestbook.html'),
		sitemap: resolve(__dirname, 'sitemap.html'),
		not_found: resolve(__dirname, 'not_found.html'),
		
		march_2026_blog: resolve(__dirname, 'blog/03-2026.html'),
		april_2026_blog: resolve(__dirname, 'blog/04-2026.html'),
		may_2026_blog: resolve(__dirname, 'blog/05-2026.html')
      },
	  output: {
		entryFileNames: 'assets/[name].js',
		chunkFileNames: 'assets/[name].js',
		assetFileNames: 'assets/[name][extname]',
		}
    }
  },
  plugins: [
	ssiPlugin(),
  ]
})