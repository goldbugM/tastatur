import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'root', 'public');
const distDir = path.join(rootDir, 'dist');

// Create dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy all files from public directory
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`Source directory ${src} does not exist`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy public directory contents
copyDirectory(publicDir, distDir);

// Read manifest.json to get the entry points
const manifestPath = path.join(distDir, 'assets', 'manifest.json');
let manifest = {};

if (fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

// Create a basic HTML template
const createHTML = (title = 'mkboard - Typing Practice') => {
  const browserEntrypoint = manifest.entrypoints?.browser || {};
  const cssFiles = (browserEntrypoint.assets?.css || []).map(path => path.replace(/\\/g, '/'));
  const jsFiles = (browserEntrypoint.assets?.js || []).map(path => path.replace(/\\/g, '/'));
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" href="/favicon.ico">
    ${cssFiles.map(css => `<link rel="stylesheet" href="${css}">`).join('\n    ')}
</head>
<body>
    <div id="root"></div>
    ${jsFiles.map(js => `<script src="${js}"></script>`).join('\n    ')}
</body>
</html>`;
};

// Create index.html
fs.writeFileSync(path.join(distDir, 'index.html'), createHTML());

// Create 404.html for GitHub Pages
fs.writeFileSync(path.join(distDir, '404.html'), createHTML('Page Not Found - mkboard'));

console.log('Static site generated successfully!');
console.log(`Output directory: ${distDir}`);
console.log('Files created:');
console.log('- index.html');
console.log('- 404.html');
console.log('- assets/ (copied from public/assets)');
console.log('- Other static files (copied from public/)');