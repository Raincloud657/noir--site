# Noir Site

 8bc31p-codex/create-production-ready-react-website-for-noir
This repo contains a lightweight React + Tailwind CSS prototype for the Noir luxury water brand. The site runs entirely from static files with dependencies loaded from public CDNs.

## Usage

Open `public/index.html` in a browser with internet access. The landing page now starts with a placeholder can that spins briefly then fades into the black background. A white `O` with a floating dash appears and animates while the rest of the site loads. Plan cards are pulled from `data/flavors.json` (served from the `public` folder) and a small feedback form stores submissions in `localStorage`.

`public/admin.html` exposes a password protected dashboard (password `noir`). The editor lets you modify the JSON configuration and saves it to `localStorage`.

### Cloudflare Pages

Deploy the `public` directory as your Pages project. No build step is required.
Make sure `public/data/flavors.json` is included so the site can load plan
information.

## Notes


This repo contains a minimal React + Tailwind CSS prototype for the Noir luxury water brand. The implementation is intentionally minimal due to the offline environment. All dependencies are loaded from public CDNs.

## Usage

Open `public/index.html` in a browser with internet access. The landing page features a simple can animation using React and Framer Motion and pulls product plans from `data/flavors.json`.

`public/admin.html` provides a stub admin dashboard that loads the JSON configuration for editing. Saving will require integration with a backend service such as Firebase or Supabase.

## Notes

- This is not a complete production setup. To build a full application, clone the repository with internet access and replace CDN links with locally managed dependencies.
 main
- Integrate Firebase or Supabase for real feedback storage and authentication.
