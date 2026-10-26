(() => {
  'use strict';

  const STORAGE_KEY = 'poc-final-cover-vote-2026-v1';
  const ENDPOINT = '/covers/api/round-two-votes';
  const form = document.getElementById('vote-form');
  const thanks = document.getElementById('thanks');
  const status = document.getElementById('form-status');
  const selectionStatus = document.getElementById('selection-status');
  const chosenSummary = document.querySelector('#chosen-summary strong');
  const dialog = document.getElementById('cover-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogLabel = document.getElementById('dialog-label');

  const uuid = () => {
    if (crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  };

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch {}
  const voterId = saved.voterId || uuid();

  const fields = ['whyFavorite', 'whyNotOthers', 'pickupReason', 'name'];
  fields.forEach((name) => {
    if (saved[name] && form.elements[name]) form.elements[name].value = saved[name];
  });
  if (saved.favorite) {
    const radio = form.querySelector(`input[name="favorite"][value="${saved.favorite}"]`);
    if (radio) radio.checked = true;
  }

  function selected() {
    return form.querySelector('input[name="favorite"]:checked')?.value || '';
  }

  function persist(submitted = false) {
    const data = { voterId, favorite: selected(), submitted };
    fields.forEach((name) => { data[name] = form.elements[name]?.value || ''; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function renderChoice() {
    const choice = selected();
    selectionStatus.textContent = choice ? `Option ${choice} is your current favorite.` : 'No favorite selected yet.';
    chosenSummary.textContent = choice ? `Option ${choice}` : 'Not selected';
    document.querySelectorAll('.cover-card').forEach((card) => {
      const meta = card.querySelector('.cover-meta span');
      meta.textContent = card.dataset.cover === choice ? 'Selected as favorite' : 'Select this cover';
    });
  }

  form.addEventListener('input', () => { persist(false); renderChoice(); });
  form.addEventListener('change', () => { persist(false); renderChoice(); });

  document.querySelectorAll('[data-zoom]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const number = button.dataset.zoom;
      dialogImage.src = `/covers/round-two/assets/cover-${number}.webp`;
      dialogImage.alt = `Peace Over Comfort cover option ${number}`;
      dialogLabel.textContent = `Option ${number}`;
      dialog.showModal();
    });
  });
  document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const button = form.querySelector('.submit');
    const favorite = selected();
    const payload = {
      round: 'round-two',
      voterId,
      favorite: Number(favorite),
      picks: [Number(favorite)],
      name: form.elements.name.value.trim(),
      whyFavorite: form.elements.whyFavorite.value.trim(),
      whyNotOthers: form.elements.whyNotOthers.value.trim(),
      pickupReason: form.elements.pickupReason.value.trim(),
      feedback: [
        `WHY OPTION ${favorite}: ${form.elements.whyFavorite.value.trim()}`,
        `WHY NOT THE OTHERS: ${form.elements.whyNotOthers.value.trim()}`,
        `WHAT WOULD MAKE ME PICK IT UP: ${form.elements.pickupReason.value.trim()}`
      ].join('\n\n'),
      website: form.elements.website.value
    };

    button.disabled = true;
    button.firstChild.textContent = 'Saving your response… ';
    status.textContent = '';

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Your response was not saved. Please try again.');
      persist(true);
      form.hidden = true;
      thanks.hidden = false;
      document.getElementById('thanks-copy').textContent = `You selected Option ${favorite}. Your comments will help shape the final cover.`;
      thanks.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      status.textContent = error.name === 'TimeoutError'
        ? 'The connection timed out. Your answers are still here—please try again.'
        : error.message || 'Your response was not saved. Please try again.';
    } finally {
      button.disabled = false;
      button.firstChild.textContent = 'Send my vote and feedback ';
    }
  });

  document.getElementById('edit-vote').addEventListener('click', () => {
    thanks.hidden = true;
    form.hidden = false;
    persist(false);
    document.getElementById('covers').scrollIntoView({ behavior: 'smooth' });
  });

  renderChoice();
})();
