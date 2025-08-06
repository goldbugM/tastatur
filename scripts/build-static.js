#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const publicDir = join(rootDir, 'root', 'public');

// Create dist directory
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy all public assets
if (existsSync(publicDir)) {
  cpSync(publicDir, distDir, { recursive: true });
}

// Read the manifest to get the correct asset filenames
let manifest = {};
const manifestPath = join(publicDir, 'assets', 'manifest.json');
if (existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    console.warn('Could not read manifest.json, using default asset names');
  }
}

// Get asset filenames from manifest or use defaults
const browserJs = manifest['browser.js'] || 'browser.js';
const serverJs = manifest['server.js'] || 'server.js';
const stylesCSS = manifest['styles.css'] || 'styles.css';

// Create the main index.html
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn touch typing with this free online typing trainer">
  <title>Typing Trainer - Learn Touch Typing</title>
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96x96.png">
  <link rel="stylesheet" href="/assets/${stylesCSS}">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    #root {
      min-height: 100vh;
    }
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div id="root">
    <div class="loading">Loading...</div>
  </div>
  <script>
    // Initialize page data for the SPA
    window.__PAGE_DATA__ = {
      locale: 'en',
      user: null,
      publicUser: null,
      settings: null,
      prefs: null
    };
  </script>
  <script src="/assets/${browserJs}"></script>
</body>
</html>`;

// Write the main index.html
writeFileSync(join(distDir, 'index.html'), indexHtml);

// Create additional route files for better SEO and direct access
const routes = [
  { path: 'practice', title: 'Practice - Typing Trainer' },
  { path: 'layouts', title: 'Keyboard Layouts - Typing Trainer' },
  { path: 'typing-test', title: 'Typing Test - Typing Trainer' }
];

routes.forEach(route => {
  const routeDir = join(distDir, route.path);
  if (!existsSync(routeDir)) {
    mkdirSync(routeDir, { recursive: true });
  }
  
  const routeHtml = indexHtml.replace(
    '<title>Typing Trainer - Learn Touch Typing</title>',
    `<title>${route.title}</title>`
  );
  
  writeFileSync(join(routeDir, 'index.html'), routeHtml);
});

// Create a 404.html for GitHub Pages
writeFileSync(join(distDir, '404.html'), indexHtml);

// Create a _config.yml for GitHub Pages (optional)
const configYml = `# GitHub Pages configuration
include:
  - "_*"
  - ".nojekyll"

plugins:
  - jekyll-redirect-from
`;

writeFileSync(join(distDir, '_config.yml'), configYml);

// Create .nojekyll to disable Jekyll processing
writeFileSync(join(distDir, '.nojekyll'), '');

console.log('Static build completed successfully!');
console.log(`Built files are in: ${distDir}`);