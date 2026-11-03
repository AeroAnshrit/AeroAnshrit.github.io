import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

function copyStaticPortfolioAssets() {
  return {
    name: 'copy-static-portfolio-assets',
    closeBundle() {
      const rootDir = process.cwd();
      const distDir = path.resolve(rootDir, 'dist');
      const src3D = path.resolve(rootDir, '3D');
      const dest3D = path.resolve(distDir, '3D');

      if (fs.existsSync(src3D)) {
        fs.cpSync(src3D, dest3D, { recursive: true });
      }

      for (const htmlFile of [
        'Anshrit_Singh_Aerospace_Portfolio-v7.html',
        'Anshrit_Singh_Aerospace_Portfolio-v7_2.html',
      ]) {
        const srcFile = path.resolve(rootDir, htmlFile);
        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, path.resolve(distDir, htmlFile));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [copyStaticPortfolioAssets()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  preview: {
    allowedHosts: true,
  },
});
