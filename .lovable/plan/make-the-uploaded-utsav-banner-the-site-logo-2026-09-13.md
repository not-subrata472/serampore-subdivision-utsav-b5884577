# Make the uploaded utsav banner the site logo

## What will change

- Upload the user's banner image (`image-2.png`) as a CDN asset — the file is never copied into the codebase.
- Header: replace the small sun-icon circle with the banner image shown as a rounded brand mark beside the "অস্তি উৎসর্জ্জী" wordmark. The image is wide (poster format), so in the header it will be displayed at a compact height with rounded corners, keeping the full artwork visible (no cropping of text).
- Footer: replace the sun-icon circle the same way for consistent branding.
- Favicon: derive a square icon from the banner's center emblem and replace the default Lovable favicon.
- No other layout, copy, color, or imagery changes; no new images generated.

## Technical details

- `lovable-assets create` on `/mnt/user-uploads/image-2.png`, pointer stored at `src/assets/utsav-banner.png.asset.json`, referenced via its CDN URL.
- Favicon: crop a square region from the center emblem, resize to 64x64, save as `public/favicon.png`, reference from `src/routes/__root.tsx` head links, remove `public/favicon.ico`.
- Header/footer edits in `src/routes/index.tsx` only.
- Verify: banner renders in header on mobile and desktop, no layout shift/overflow, no console errors.
