# Gallery image viewer update

## What will change
- Remove the numbered badges from every gallery image area.
- Replace browser fullscreen with a centered, page-level image popup.
- Keep the background dimmed and allow closing through the close button, backdrop click, or Escape.
- Show the selected image at its natural proportions without cropping.

## Technical details
- Rework the gallery image control in the existing homepage gallery component.
- Add an accessible modal dialog with scroll locking, keyboard dismissal, and clear labels.
- Leave empty image placeholders unchanged except for removing their number badges.
- Verify the popup on mobile and desktop and confirm the page remains error-free.
