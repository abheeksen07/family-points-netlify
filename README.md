# Family Points (Netlify + Google Sheets)

Single-page React app synced to Google Sheets via Netlify Functions.

## Files
- `index.html` — the app
- `netlify.toml` — Netlify config (publish from repo root, route `/api/sheets` to the function)
- `netlify/functions/sheets.js` — serverless proxy to Apps Script `/exec`

## Deploy
1. Create a new GitHub repo and upload these files.
2. In Netlify: Add new site -> Import from Git -> choose this repo.
3. Build settings: Build command: (leave empty), Publish directory: `.`
4. Deploy, then open your site with `?v=1`.
