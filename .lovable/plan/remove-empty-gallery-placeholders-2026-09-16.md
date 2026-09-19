# Remove empty gallery placeholders

## What will change
- Remove the five gallery cards that do not contain uploaded pictures.
- Keep the single gallery card containing the uploaded festival poster and its image popup button.
- Let the remaining picture use the gallery space cleanly on mobile and desktop.

## Technical details
- Filter the gallery data to image-backed entries only and remove placeholder-only rendering and unused icon imports.
- Preserve the existing natural image proportions and popup viewer behavior.
- Verify the gallery layout and page health after the change.
