import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig, type Connect, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const CV_PATH = '/nicole-oraekie-cv.pdf';

/**
 * The CV is a static file in public/. This plugin
 * - warns at startup/build if the file is missing, and
 * - stops the dev and preview servers from answering a missing PDF with the
 *   React app (their SPA fallback), so a missing CV is a plain 404, never the
 *   site's "page not found" screen.
 */
function cvFile(): Plugin {
  let publicDir = 'public';
  const missingPdf = (outDir: string): Connect.NextHandleFunction => (req, res, next) => {
    const path = (req.url ?? '').split('?')[0];
    if (path.toLowerCase().endsWith('.pdf') && !existsSync(join(outDir, decodeURIComponent(path)))) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(`Not found: ${path}${path === CV_PATH ? ' (add the CV at public/nicole-oraekie-cv.pdf)' : ''}`);
      return;
    }
    next();
  };

  return {
    name: 'cv-file',
    configResolved(config) {
      publicDir = config.publicDir;
      if (!existsSync(join(publicDir, CV_PATH))) {
        config.logger.warn('\n  CV not found: add it at public/nicole-oraekie-cv.pdf (or set a URL in src/data/socials.ts)\n');
      }
    },
    configureServer(server) {
      server.middlewares.use(missingPdf(publicDir));
    },
    configurePreviewServer(server) {
      server.middlewares.use(missingPdf(join(server.config.root, server.config.build.outDir)));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cvFile()],
});
