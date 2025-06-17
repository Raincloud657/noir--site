# Noir Site

This repo contains a React + Tailwind CSS web app for the Noir luxury water brand. The app was bootstrapped with Vite and lives in the `noir-app` folder.

## Usage

Run `npm install` in `noir-app` and then `npm run dev` for development or `npm run build` to produce static files under `noir-app/dist`. The landing page shows a short can animation that fades to a rotating `ø` symbol with a dash. After loading, three loot-box style plan cards appear and link to their respective pages. Plan data is sourced from `public/data/flavors.json` and a feedback form stores submissions locally.

The legacy static prototype still exists in `public/` for reference, including `admin.html` for editing the plan configuration (password `noir`).
Each plan page reads from the same JSON file, so you can update product info without touching the HTML.

### Cloudflare Pages

Deploy the `public` directory as your Pages project. No build step is required.
Make sure `public/data/flavors.json` is included so the site can load plan
information.

## Notes

- This is still a browser-only demo. Replace CDN links with local packages and connect a real backend for production use.
- Integrate Firebase or Supabase for real feedback storage and authentication.
