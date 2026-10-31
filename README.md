# Peace Over Comfort email signup update
Prepared October 30, 2026. Based on the current GitHub main homepage (blob a1838d01eb0d003f25474a9b865f90b7c62187cd).

## Deploy
This is an UPDATE, not a complete replacement website. Keep all existing files and assets.
1. Create a branch from your current main branch. If the homepage has changed since this package was prepared, compare it before replacing it.
2. Replace the root index.html with this package's index.html.
3. Add assets/signup.css and assets/signup.js inside your existing assets folder.
4. Do not replace vercel.json, the existing stylesheets, images, reader extras, or QR page.
5. Commit the three files and inspect your Vercel preview. Merge only after testing.
No dependency installation, build configuration changes, environment variables, Redis, or private API key are required. Nothing has been pushed or deployed by this task.

## Copy
Headline: A little hope for the season you’re in.
Supporting line: Get encouragement from Daniel Todd and updates as Peace Over Comfort moves toward release.
Button: Keep me posted
First name is optional. Email and the unchecked consent checkbox are required.
Consent: I agree to receive emails from Daniel Todd. Unsubscribe anytime.
TikTok: Follow along on TikTok @peaceovercomfortbook

## Integration
Browser-only POST https://a.klaviyo.com/client/subscriptions/?company_id=XMvydf
API revision: 2026-10-15
Only destination list: ViqaYh (Peace Over Comfort Updates, as supplied by you).
The payload explicitly requests email marketing consent. No SMS or tracking consent is added.
An optional name is omitted if empty to avoid erasing an existing name.
HTTP 202 means accepted for processing, not confirmed subscription or guaranteed email delivery.
The empty success body is never parsed as JSON.
The form shows: Check your email and tap the confirm button to finish signing up.
Double opt-in remains a list setting, not a client-side implementation.

## Important Klaviyo checks before promoting
Confirm public company ID XMvydf and list ViqaYh belong to the intended account.
Confirm the list uses double opt-in and its confirmation email and confirmation page identify Daniel Todd / Peace Over Comfort.
Review existing list-triggered and account-wide flows before launching. This update creates no flows and changes no automations, but it cannot prevent existing account flows from responding to a signup.
The list association is specific to this book. Klaviyo email consent is profile/channel-level, not an isolated per-list permission. Keep unrelated campaigns segmented away from these subscribers.
The copy promises encouragement and book updates without a schedule. No immediate welcome email is created.
Add a suitable privacy notice before promoting signups widely if your site does not already have one.
A client-side honeypot is basic friction, not robust bot protection. It can be bypassed. Double opt-in helps prevent unconfirmed addresses from becoming subscribers.

## Test on your Vercel preview
Use an email address you own that has never subscribed to this list.
1. Submit blank or malformed email: see an error and no subscriptions request.
2. Enter valid email without checking consent: see consent error and no subscriptions request.
3. Leave first name empty, check consent, submit: should work.
4. Repeat with another address you control and a first name. Confirm first_name reaches the profile.
5. During a request the button should say Submitting... and reject duplicate submissions.
6. In browser developer tools, open Network and filter for subscriptions. Expect POST with company_id=XMvydf, revision 2026-10-15, and list id ViqaYh. Expect status 202 with an empty response body.
7. Check your inbox and spam folder. Before confirming, do not assume the profile is subscribed.
8. Click the confirmation link and verify the email marketing consent and membership in Peace Over Comfort Updates in Klaviyo.
9. Check on mobile and within TikTok's in-app browser. If the in-app browser blocks requests, try the device's regular browser.
10. Optionally test offline mode: the form should show a connection error and re-enable the button.
11. For honeypot testing in your own preview, set the signup-website field value through developer tools. Submit and verify that no request is sent.
12. Already-subscribed addresses may not receive another confirmation email. Use a fresh address for an end-to-end double opt-in test.

## Troubleshooting
Console warnings start with [Peace Over Comfort signup]. The code does not log email addresses or names.
- 400 or 422: inspect Network > subscriptions > Response for the validation error. Confirm the request schema, required headers, IDs, and email. Redact addresses before sharing screenshots.
- 401 or 403: verify company ID, account/list settings, and any API access restrictions. Never solve this by adding a private key to browser code.
- 429: wait a few minutes before retrying. The code does not automatically retry.
- 5xx: temporary provider error. Try later.
- Failed to fetch / CORS / ERR_BLOCKED_BY_CLIENT: check extensions, privacy blocking, connectivity, and any Content Security Policy. If your site has a CSP, its connect-src must permit https://a.klaviyo.com. Do not remove the entire security policy.
- Timeout: the provider may still have accepted the request. Check your inbox before retrying.
- No Network request and disabled button: check whether /assets/signup.js loads with HTTP 200 and whether Console shows a script error.
- Do not use no-cors. It would hide the result and make reliable success handling impossible.
- No confirmation email after 202: inspect Klaviyo's double opt-in settings, sender configuration, suppression/consent state, and whether this was an existing subscriber.

## TikTok link
After deployment, point the bio to https://peaceovercomfort.com/#updates to jump directly to the signup.
If you later need attribution, add a separate UTM plan. This change intentionally adds no tracking scripts or browser storage.

## Verification performed
JavaScript syntax checked.
Desktop layout and 390px / 320px layouts inspected.
Browser empty-email validation checked.
Automated isolated tests cover payload/list/channel, optional name, empty 202 response, repeat-submit guard, malformed email, consent, honeypot, HTTP 400/401/403/422/429/500, network failure, and timeout/button recovery.
No real subscription request was sent. Actual account/list ownership, confirmation delivery, existing flows, and post-confirmation membership still need your live test.

## Improved implementation prompt
Update my existing plain HTML, CSS, and JavaScript website at peaceovercomfort.com, hosted on Vercel. Inspect the current homepage first and preserve the existing sunrise imagery, wordmark, navigation, reader extras, and QR pages. The book is not released.

Add a compact, accessible signup section in the homepage hero, before the sunrise image, with id="updates". Match the current fonts, cream background, dark brown text, and gold accent #C8963E. Use the headline "A little hope for the season you’re in." and supporting text "Get encouragement from Daniel Todd and updates as Peace Over Comfort moves toward release." Include optional first name, required email, and a "Keep me posted" button. Below the fields include a required, initially unchecked checkbox with "I agree to receive emails from Daniel Todd. Unsubscribe anytime." Add a smaller TikTok link reading "Follow along on TikTok @peaceovercomfortbook". Do not use em dashes or suggest that the book is available for purchase.

Use Klaviyo's browser-only Client Subscriptions endpoint with public company ID XMvydf and only list ViqaYh. Verify and pin a supported API revision and use the documented JSON:API schema. Send email and a nonempty first_name as profile attributes; explicitly set email marketing consent to SUBSCRIBED. Do not include a private key, SMS consent, analytics scripts, cookies, or local storage.

Double opt-in is configured on the list. Treat HTTP 202 as acceptance, not confirmed subscription, and do not parse its empty body. Show exactly "Check your email and tap the confirm button to finish signing up." Handle email/consent validation, a hidden honeypot, duplicate submits, disabled/loading button, network failures, timeouts, throttling, and non-JSON error responses. Keep visitor data out of console logs. Use visible labels, keyboard focus states, accessible status announcements, and a stacked mobile layout. Keep a no-JavaScript form from navigating with personal data in the URL.

Create no email flows or automations and change no Klaviyo account settings. Flag that existing flows could still trigger and must be reviewed by the owner. Do not send test subscriptions without an owner-supplied test address and authorization. Do not deploy. Deliver complete replacement/new files, exact installation instructions, tests, and browser Network/Console troubleshooting. If a backend becomes necessary, explain the reason and ask before changing the architecture.

## Reference
https://developers.klaviyo.com/en/reference/create_client_subscription
https://raw.githubusercontent.com/klaviyo/openapi/main/openapi/stable/apis/create_client_subscription.json

