import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        journal: resolve(__dirname, 'journal.html'),
		projects: resolve(__dirname, 'projects.html'),
		sitemap: resolve(__dirname, 'sitemap.html'),
      }
    }
  }
})