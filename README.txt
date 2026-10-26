PEACE OVER COMFORT — CONCEPT 1 HOMEPAGE UPDATE

FILES IN THIS PACKAGE
- index.html
- styles.css
- assets/cover-1.webp
- covers/round-two/index.html
- covers/round-two/vote.css
- covers/round-two/vote.js
- covers/round-two/assets/cover-1.webp
- covers/round-two/assets/cover-5.webp
- covers/round-two/assets/cover-6.webp

HOW TO USE THIS IN THE EXISTING VERCEL PROJECT
1. Replace the existing homepage index.html with this index.html.
2. Replace or add styles.css at the project root.
3. Add the assets folder and cover-1.webp.
4. Add the included /covers/round-two folder. Do not replace the existing
   /covers page.
5. Keep the original /covers voting page, /covers/design-review results page,
   their first-round data, and /qr-code. Do not delete or modify them.
6. Commit the changes to the branch connected to Vercel.
7. Review the Vercel preview deployment before promoting it to Production.

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
