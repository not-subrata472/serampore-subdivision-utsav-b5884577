# Add the new poster with a 37-second music cue

## What will change
- Add the uploaded blue-and-white poster to the start of the “আসন্ন উৎসবের পরিবেশ” gallery.
- Trim the uploaded music to its first 37 seconds and store both uploads with the site’s media.
- When a visitor manually opens this poster in the full-screen viewer, start its music immediately from the beginning.
- Stop and reset the music when the viewer closes; opening any other poster will not play this track.

## Technical details
- Extend the selected gallery item with an optional music source.
- Preload the short clip so playback can begin from the same click that opens the picture.
- Preserve the existing gallery layout and popup controls.
- Verify the poster, exact 37-second clip, close/reset behavior, and phone/desktop presentation.
