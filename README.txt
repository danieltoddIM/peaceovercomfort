PEACE OVER COMFORT — VOTING REPAIR

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
/covers/round-two/design-review — Round Two results and anonymous comments
/covers/design-review — original live Round One review, not a static snapshot
/covers/results — original protected Round One results
/covers — original Round One voting page
/qr-code, /qr, /welcome — existing redesigned QR and welcome pages

Name remains optional. Browser IDs allow updates without duplicate votes.
Do not clear browser storage when retrying a failed submission.
Only a successful server response shows the saved confirmation. A timeout
can be retried safely with the same browser ID.

The Vercel frontend still requires the upload above. Backend deployment alone
does not change the Vercel website's configuration.
