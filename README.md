# Noir Site

This repo contains a lightweight React + Tailwind CSS prototype for the Noir luxury water brand. The site runs entirely from static files with dependencies loaded from public CDNs.

## Usage

Open `public/index.html` in a browser with internet access. The landing page now starts with a placeholder can that spins briefly then fades into the black background. A white `O` with a floating dash appears and animates while the rest of the site loads. Plan cards are pulled from `data/flavors.json` (served from the `public` folder) and a small feedback form stores submissions in `localStorage`.

`public/admin.html` exposes a password protected dashboard (password `noir`). The editor lets you modify the JSON configuration and saves it to `localStorage`.

### Cloudflare Pages

Deploy the `public` directory as your Pages project. No build step is required.
Make sure `public/data/flavors.json` is included so the site can load plan
information.

## Notes

- This is still a browser-only demo. Replace CDN links with local packages and connect a real backend for production use.
- Integrate Firebase or Supabase for real feedback storage and authentication.
