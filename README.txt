PEACE OVER COMFORT — COMPLETE SITE REDESIGN

FILES IN THIS PACKAGE
- index.html
- styles.css
- assets/brand.css
- assets/cover-1.webp
- covers/index.html (preserved Round One voting and API behavior)
- covers/design-review/index.html (preserved Round One results and comments)
- covers/cover-assets/cover-1.webp through cover-16.webp
- covers/round-two/index.html
- covers/round-two/vote.css
- covers/round-two/vote.js
- covers/round-two/assets/cover-1.webp
- covers/round-two/assets/cover-5.webp
- covers/round-two/assets/cover-6.webp
- qr-code/index.html
- qr-code/peaceovercomfort-qr.svg
- qr-code/peaceovercomfort-qr.png
- welcome/index.html
- vercel.json

HOW TO USE THIS IN THE EXISTING VERCEL PROJECT
1. Copy the full contents of this package into the existing project, preserving
   any serverless API files that already live under /covers/api.
2. Do not delete or replace the original Round One API or its stored responses.
3. Add the separate Round Two endpoint described below.
4. Commit the changes to the branch connected to Vercel.
5. Review every route in the Vercel preview before promoting it to Production.

REDESIGNED ROUTES
- / — homepage
- /covers — original Round One vote, retained and restyled
- /covers/design-review — complete Round One results and comments, retained
- /covers/round-two — new three-cover final vote
- /qr-code — QR download and print guidance
- /qr and /welcome — reader-scanner welcome page and music extras

All routes now use the Quiet Editorial Peace Over Comfort wordmark. The P/C
badge has been removed. The shared design system is in /assets/brand.css.

The homepage links to these existing paths:
- /qr-code
- /covers/round-two

The Round Two voting page POSTs JSON to /covers/api/round-two-votes with round
set to "round-two", favorite set to 1, 5, or 6, and picks containing that single
favorite. It also sends whyFavorite, whyNotOthers, pickupReason, a combined
feedback field, the optional name, and a stable browser voterId.

IMPORTANT: Add a separate Round Two API and data store at
/covers/api/round-two-votes. Do not repurpose the original /covers/api/votes
endpoint or its stored responses. This preserves the complete Round One voting
history and prevents the two result sets from being mixed.

UPDATED VERSION
The book-cover display is locked to its original 2:3 proportion and capped to
the available viewport height so it cannot stretch or run off the screen.
