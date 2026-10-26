(() => {
  'use strict';
  const ENDPOINT = '/covers/api/round-two-votes';
  const OPTIONS = [1, 5, 6];
  let votes = [];
  const $ = (id) => document.getElementById(id);
  const escape = (value = '') => String(value).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function counts() {
    return OPTIONS.reduce((result, option) => ({...result, [option]: votes.filter((v) => Number(v.favorite) === option).length}), {});
  }

  function renderSummary() {
    const tally = counts();
    const total = votes.length;
    const leader = OPTIONS.slice().sort((a, b) => tally[b] - tally[a])[0];
    const hasVotes = total > 0;
    const leaders = OPTIONS.filter(option => tally[option] === tally[leader]);
    $('response-total').textContent = total;
    $('leader-number').textContent = hasVotes ? (leaders.length > 1 ? 'Tie' : `#${leader}`) : '—';
    $('leader-share').textContent = hasVotes ? `${Math.round((tally[leader] / total) * 100)}%` : '—';
    OPTIONS.forEach((option) => { $('cover-count-' + option).textContent = `${tally[option]} ${tally[option] === 1 ? 'vote' : 'votes'}`; });
    $('result-list').innerHTML = OPTIONS.slice().sort((a,b) => tally[b]-tally[a]).map((option) => {
      const percentage = total ? Math.round((tally[option] / total) * 100) : 0;
      return `<div class="result-row"><strong>Option ${option}</strong><div class="bar"><i style="width:${percentage}%"></i></div><span>${tally[option]} · ${percentage}%</span></div>`;
    }).join('');
    if (hasVotes && leaders.length > 1) {
      $('leader').innerHTML = `<span>Tied for the lead</span><strong>Options ${leaders.join(' & ')}</strong><p>${tally[leader]} votes each</p>`;
    } else if (hasVotes) {
      $('leader').innerHTML = `<span>Current leader</span><img src="/covers/round-two/assets/cover-${leader}.webp" alt="Current leader, option ${leader}"><strong>Option ${leader}</strong><p>${tally[leader]} of ${total} votes · ${Math.round((tally[leader] / total) * 100)}%</p>`;
    }
  }

  function renderResponses() {
    const filter = $('filter').value;
    const shown = votes.filter((vote) => filter === 'all' || String(vote.favorite) === filter);
    $('response-count').textContent = `Showing ${shown.length} of ${votes.length} responses`;
    $('empty-state').hidden = shown.length > 0;
    $('response-list').innerHTML = shown.map((vote) => {
      const index = votes.indexOf(vote) + 1;
      return `<article class="response"><div class="response-head"><h3>Response ${String(index).padStart(2,'0')}</h3><span class="favorite-badge">Favorite · Option ${escape(vote.favorite)}</span></div><div class="answer"><span>Why this one</span><p>${escape(vote.whyFavorite)}</p></div><div class="answer"><span>Why not the others</span><p>${escape(vote.whyNotOthers)}</p></div><div class="answer"><span>What creates pickup interest</span><p>${escape(vote.pickupReason)}</p></div></article>`;
    }).join('');
  }

  async function load() {
    const button = $('refresh');
    button.disabled = true;
    button.textContent = 'Checking…';
    try {
      const response = await fetch(ENDPOINT, {cache:'no-store', signal:AbortSignal.timeout(20000)});
      let data;
      try { data = await response.json(); }
      catch { throw new Error('Results are temporarily unavailable. Please try again shortly.'); }
      if (!response.ok || !data.ok || !Array.isArray(data.votes)) throw new Error(data.error || 'Results could not be loaded.');
      votes = data.votes;
      renderSummary();
      renderResponses();
      $('live-status').textContent = `Live · ${votes.length} ${votes.length === 1 ? 'response' : 'responses'} · Updated just now`;
    } catch (error) {
      $('live-status').textContent = error.message || 'Results could not be loaded. Please try again.';
    } finally {
      button.disabled = false;
      button.textContent = 'Refresh results';
    }
  }

  $('refresh').addEventListener('click', load);
  $('print').addEventListener('click', () => window.print());
  $('filter').addEventListener('change', renderResponses);
  const modal = $('cover-modal');
  document.querySelectorAll('.cover-button').forEach((button) => button.addEventListener('click', () => {
    const option = button.dataset.cover;
    $('modal-image').src = `/covers/round-two/assets/cover-${option}.webp`;
    $('modal-image').alt = `Peace Over Comfort cover option ${option}`;
    $('modal-label').textContent = `Option ${option}`;
    modal.showModal();
  }));
  $('close-modal').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });
  load();
  setInterval(() => { if (!document.hidden) load(); }, 60000);
})();
