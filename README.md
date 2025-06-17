# Noir Site

This repo contains a React + Tailwind CSS web app for the Noir luxury water brand. The app was bootstrapped with Vite and lives in the `noir-app` folder.

## Usage

Install dependencies in `noir-app` and run `npm run dev` for local testing.
For production you normally run `npm run build` from the repo root. This
script installs dependencies inside `noir-app` and copies the final `dist`
folder to the repository root. Cloudflare Pages can use this default build
command and automatically deploy the generated `dist` directory.
Without building first you may just see raw text instead of the animated site.
The landing page shows a spinning can backlit so its outline is visible. The can fades to black as a bold white “O” symbol spins with a moving dash. After the loading sequence the page cracks open to reveal a dusty rainbow marble background with loot-box plan cards in front. Plan data is sourced from `public/data/flavors.json` and a feedback form stores submissions locally.

The legacy static prototype still exists in `public/` for reference, including `admin.html` for editing the plan configuration (password `noir`).
Each plan page reads from the same JSON file, so you can update product info without touching the HTML.

### Cloudflare Pages

Cloudflare Pages can build the site automatically. Keep the default build command
`npm run build` and set the output directory to `dist`. The root `package.json`
executes the build in `noir-app` and copies the result. Make sure
`data/flavors.json` is committed so plan information loads correctly.

## Notes

- This is still a browser-only demo. Replace CDN links with local packages and connect a real backend for production use.
- Integrate Firebase or Supabase for real feedback storage and authentication.
