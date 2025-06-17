# Noir Site

This repo contains a minimal React + Tailwind CSS prototype for the Noir luxury water brand. The implementation is intentionally minimal due to the offline environment. All dependencies are loaded from public CDNs.

## Usage

Open `public/index.html` in a browser with internet access. The landing page features a simple can animation using React and Framer Motion and pulls product plans from `data/flavors.json`.

`public/admin.html` provides a stub admin dashboard that loads the JSON configuration for editing. Saving will require integration with a backend service such as Firebase or Supabase.

## Notes

- This is not a complete production setup. To build a full application, clone the repository with internet access and replace CDN links with locally managed dependencies.
- Integrate Firebase or Supabase for real feedback storage and authentication.
