PEACE OVER COMFORT — OPTION THREE / FROM SHADOW TO LIGHT

Homepage redesigned in charcoal, cream and amber. Live HTML text sits above
a separate mountain horizon, with the actual mountain cover in its own section.
Mountain image generated with the built-in image tool: photorealistic wide
Arizona-inspired ridges, charcoal sky, amber dawn, no text or book imagery.
The image is illustrative, not a photograph of a named landmark.

COHESIVE DESIGN UPDATE
The homepage, welcome, QR, and both voting pages share a consistent wordmark,
navigation, charcoal/cream/amber palette, spacing and responsive typography.
The welcome page uses the mountain horizon below a properly spaced wordmark.
Voting remains visually neutral around the cover choices. Voting logic,
existing music links, QR downloads, and backend connections are preserved.

PRIVACY UPDATE
Both voting pages no longer link to results. Both rounds' backend results
require the existing owner sign-in or results password (username: daniel).
Round One static result snapshots have been replaced with private-access pages.
No database responses were deleted. Include design-review.html in your upload
to replace the older root-level public snapshot, if it is still in your repo.
Private review links for Daniel:
https://peace-over-comfort-cover-vote.influence-mo-0784.chatgpt.site/design-review
https://peace-over-comfort-cover-vote.influence-mo-0784.chatgpt.site/round-two-review
If a password has never been set, use the existing owner-setup page on that
same service while signed in as the owner. No password is embedded in this ZIP.

No Redis account or new Vercel environment variables are required.
The existing hosted voting service has a separate Round Two API/table.
Round One records and its original API are unchanged.

DEPLOY
1. Upload the CONTENTS of this folder into the root of the existing GitHub
   repository. Keep covers/, assets/, qr-code/, welcome/ and vercel.json at
   their existing locations. Do not upload the enclosing folder as a new path.
2. Include vercel.json: it reconnects voting to the existing service.
3. Commit to your Vercel-connected branch and wait for deployment to finish.
4. Reload /covers/round-two and submit your own real vote with name blank.
   Check /covers/round-two/design-review for that response.

If the earlier Redis file api/round-two-votes.js was uploaded, remove that
obsolete file. This package no longer uses it. Do not delete other API files.

ROUTES
/covers/round-two — choose one of three covers and answer three questions
/covers/round-two/design-review — private Round Two review
/covers/design-review — private Round One review
/covers/results — original protected Round One results
/covers — original Round One voting page
/qr-code, /qr, /welcome — existing redesigned QR and welcome pages

Name remains optional. Browser IDs allow updates without duplicate votes.
Do not clear browser storage when retrying a failed submission.
Only a successful server response shows the saved confirmation. A timeout
can be retried safely with the same browser ID.

The Vercel frontend still requires the upload above. Backend deployment alone
does not change the Vercel website's configuration.
