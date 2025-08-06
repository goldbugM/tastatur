# GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

1. **Push to GitHub Repository**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings: `https://github.com/goldbugM/tastatur/settings`
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"
   - The deployment will start automatically

3. **Access Your Site**
   - Your site will be available at: `https://goldbugm.github.io/tastatur/`
   - It may take a few minutes for the first deployment to complete

## How It Works

- The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically triggers on pushes to the main branch
- It builds the application using `npm run build-static`
- The static build script (`scripts/build-static.js`) creates a static version of the React SPA
- The built files are deployed to GitHub Pages

## Local Testing

To test the static build locally:

```bash
# Build the static version
npm run build-static

# Serve the dist folder (you can use any static server)
npx serve dist
```

## Features Included

- ✅ Typing practice lessons
- ✅ Keyboard layout customization  
- ✅ Typing tests
- ✅ Progress tracking (local storage)
- ✅ Multiple themes
- ✅ Responsive design
- ❌ User accounts (removed - requires backend)
- ❌ External analytics (removed for privacy)
- ❌ Email notifications (removed - requires backend)

## Notes

- This is a client-side only version - no server-side features
- User data is stored in browser local storage
- All external services have been removed for privacy and simplicity
- The app works completely offline after initial load