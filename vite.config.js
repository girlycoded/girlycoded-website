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
		projects: resolve(__dirname, 'projects.html'),
		sitemap: resolve(__dirname, 'sitemap.html'),
		navbar: resolve(__dirname, 'components/navbar.html'),
      },
	  output: {
		entryFileNames: 'assets/main.js',
		chunkFileNames: 'assets/[name].js',
		assetFileNames: 'assets/[name][extname]'
	  }
    }
  },
  plugins: [
	ssiPlugin(),
	viteStaticCopy({
		targets: [
			{
				src: 'src/main.js',
				dest: '',
			}
		]
	})
	]
})