# Add new poster to the gallery section

## What you'll see
The "আসন্ন উৎসবের পরিবেশ" gallery section will show the newly uploaded ornate উৎসব poster (১৩৯ তম জন্ম মহা মহোৎসব artwork) as the **first** picture, followed by the existing blue poster. Both keep their natural (big) size, and each keeps the "পূর্ণ পর্দা" popup viewer.

## Steps
1. Upload the new image (`photo_6145364255549624638_y-3.jpg`) to CDN storage and create `src/assets/utsav-poster-ornate.jpg.asset.json`.
2. In `src/routes/index.tsx`:
   - Import the new asset.
   - Add a new entry at the **start** of the `scenes` array (before the existing poster entry), with Bengali alt text describing the ornate উৎসব poster — no caption/label text, matching the existing entry style.
3. No layout changes needed — `GalleryFigure` already renders images at natural size with the popup button; the new entry flows through the same component.

## Notes
- Gallery items stack in a single column, so the new poster appears above the existing one at the full width of that column.
