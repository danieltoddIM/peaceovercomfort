(() => {
  'use strict';
  const form = document.getElementById('updates-form');
  if (!form) return;
  const name = document.getElementById('signup-name');
  const email = document.getElementById('signup-email');
  const consent = document.getElementById('signup-consent');
  const trap = document.getElementById('signup-website');
  const button = document.getElementById('signup-submit');
  const status = document.getElementById('signup-status');
  const confirmation = 'Check your email and tap the confirm button to finish signing up.';
  let busy = false;
  let accepted = false;

  function message(text, state) {
    status.textContent = text;
    status.dataset.state = state;
  }

  function invalid(field, text) {
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', 'signup-status');
    message(text, 'error');
    field.focus();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (busy || accepted) return;
    for (const field of [name, email, consent]) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
    message('', '');
    if (trap.value.trim()) {
      message('We could not submit this form. Please reload the page and try again.', 'error');
      return;
    }
    email.value = email.value.trim();
    const firstName = name.value.trim();
    if (firstName.length > 100) {
      invalid(name, 'Please keep your first name under 100 characters.');
      return;
    }
    if (!email.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || email.value.length > 254) {
      invalid(email, 'Please enter a valid email address, such as name@example.com.');
      return;
    }
    if (!consent.checked) {
      invalid(consent, 'Please check the consent box to receive emails from Daniel Todd.');
      return;
    }

    const profileAttributes = {
      email: email.value,
      subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } }
    };
    // Omitting a blank optional name avoids overwriting an existing profile name.
    if (firstName) profileAttributes.first_name = firstName;
    const payload = {
      data: {
        type: 'subscription',
        attributes: {
          custom_source: 'Peace Over Comfort homepage signup',
          profile: { data: { type: 'profile', attributes: profileAttributes } }
        },
        relationships: { list: { data: { type: 'list', id: 'ViqaYh' } } }
      }
    };
    busy = true;
    button.disabled = true;
    button.textContent = 'Submitting...';
    form.setAttribute('aria-busy', 'true');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=XMvydf', {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          accept: 'application/vnd.api+json',
          'content-type': 'application/vnd.api+json',
          revision: '2026-10-15'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      if (response.status === 202) {
        // Klaviyo returns an empty body. Do not attempt response.json().
        accepted = true;
        form.reset();
        message(confirmation, 'success');
        button.textContent = 'Check your email';
        status.focus();
        return;
      }
      // Do not log names, email addresses, request bodies, or raw API errors.
      console.warn('[Peace Over Comfort signup] HTTP ' + response.status + '. Inspect the subscriptions request in Network.');
      if (response.status === 429) {
        message('Too many attempts right now. Please wait a few minutes before trying again.', 'error');
      } else if (response.status === 400 || response.status === 422) {
        message('We could not accept this signup. Check your email address and try again. If it still fails, please try later.', 'error');
      } else {
        message('Signup is temporarily unavailable. Please try again later.', 'error');
      }
      status.focus();
    } catch (error) {
      const timedOut = error.name === 'AbortError';
      console.warn('[Peace Over Comfort signup] ' + (timedOut ? 'Request timed out.' : 'Network request failed or was blocked.'));
      message(timedOut
        ? 'The request took too long. Check your inbox before trying again in a few minutes.'
        : 'We could not connect. Check your connection or try opening this page in your regular browser.', 'error');
      status.focus();
    } finally {
      clearTimeout(timer);
      busy = false;
      form.removeAttribute('aria-busy');
      button.disabled = accepted;
      if (!accepted) button.textContent = 'Keep me posted';
    }
  });
  // Only enable submission after the handler is installed. No-JS forms stay inert.
  form.noValidate = true;
  button.disabled = false;
})();
