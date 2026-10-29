PEACE OVER COMFORT — WARM SUNRISE WEBSITE

October 29 update: approved first sunrise panorama across the homepage,
reader welcome, and QR page. Light ivory backgrounds, warm brown type,
and gold accents replace the near-black presentation. Final cover unchanged.
Mobile song metadata now stacks cleanly; navigation has larger tap targets.
QR page includes a destination preview; music links identify Suno as destination.

Upload ALL files together, including assets/sunrise.css and
assets/sunrise-horizon.png. The new image is a generated illustrative landscape,
not a documentary photograph of a named location.

Create a fresh branch from current main for this upload. The previous newdesign
pull request is already merged. Do not re-use the old branch for this update.
This vercel.json intentionally omits the retired voting backend rewrites.

The mountain cover already featured in this design is now the final cover.
It is stored at assets/final-cover.webp, independent of retired voting pages.
Navigation: The book, Reader extras, QR code.
Voting forms, scripts, review pages, and backend proxy rewrites have been
removed from this package. Old cover/review links redirect to the book section.

DEPLOY
Upload the ZIP contents to the root of your existing Vercel-connected branch.
Include vercel.json: redirects retire old voting URLs even if old files remain
after a manual upload. You may remove the old covers/ folder, design-review.html,
and obsolete api/round-two-votes.js from that branch. Do not delete unrelated files.

The separate voting backend and stored responses have NOT been changed or
deleted. This update removes voting from the book website, not that service.
Existing private historical review access remains on the separate service.

After deployment, check /, /welcome, /qr-code, and /qr. Old /covers and
/covers/round-two links should take visitors to the book section.
QR downloads and music links are unchanged. No new environment variables
or Redis connection are required.
