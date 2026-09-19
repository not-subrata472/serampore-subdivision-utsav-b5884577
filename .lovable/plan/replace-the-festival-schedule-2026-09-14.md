# Replace the festival schedule

## What will change
- Replace the current four generic schedule rows with the eight Bengali times and activities shown in the first uploaded poster.
- Redesign only the schedule area as a slim vertical timeline inspired by the second image, alternating activities on the left and right.
- Keep the existing Bengali typography, page colors, and surrounding homepage sections unchanged.
- Make the timeline readable on narrow phones without clipping or overlapping.

## Technical details
- Update the schedule data and its rendering in `src/routes/index.tsx`.
- Use the existing semantic color tokens and icon set; no uploaded image will be embedded.
- Verify the homepage at desktop and mobile widths and confirm the build remains healthy.
