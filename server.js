import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, 'dist');

// Serve static assets with appropriate caching
app.use(express.static(DIST_DIR, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    // Don't cache index.html to allow instant updates upon redeploy
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Basic health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'astrotanntra' });
});

// Single Page Application (SPA) fallback: serve index.html for all other routes
app.use((req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ Astrotanntra web app running at http://0.0.0.0:${PORT}`);
});
