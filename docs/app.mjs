import { buildReviewMatrix, matrixToCsv, caseFromHash, caseHash } from './helpers.mjs';

const select = document.querySelector('#case-select');
const caseStatus = document.querySelector('#case-status');
const reveal = document.querySelector('#reveal-case');
const answer = document.querySelector('#case-answer');
const share = document.querySelector('#share-case');
const shareStatus = document.querySelector('#share-status');
const shareFallback = document.querySelector('#share-fallback');
const candidateDownload = document.querySelector('#download-candidate');
const reviewedDownload = document.querySelector('#download-reviewed');
const downloads = [];
let cases = [];

function releaseDownloads() {
  downloads.splice(0).forEach(url => URL.revokeObjectURL(url));
}

function setReviewVisible(visible) {
  answer.hidden = !visible;
  reveal.setAttribute('aria-expanded', String(visible));
  reveal.textContent = visible ? 'Hide the review' : 'Reveal the review';
}

function setDownload(link, text, filename, type) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  downloads.push(url);
  link.href = url;
  link.download = filename;
  link.hidden = false;
}

function renderCase(id) {
  const selected = cases.find(item => item.id === id);
  if (!selected) return;
  releaseDownloads();
  select.value = selected.id;
  document.querySelector('#case-source').textContent = selected.source;
  document.querySelector('#candidate-text').textContent = selected.broken;
  document.querySelector('#reviewed-text').textContent = selected.corrected;
  document.querySelector('#case-explanation').textContent = selected.explanation;
  document.querySelector('#case-format').textContent = selected.kind;
  const reviewNames = { code: 'Format check', human: 'Language review', editorial: 'Editorial review' };
  caseStatus.textContent = `${reviewNames[selected.review] ?? 'Review'} · Original fictional example`;
  setReviewVisible(false);
  shareStatus.textContent = '';
  shareFallback.hidden = true;
  const extension = selected.kind === 'VTT' ? 'vtt' : 'srt';
  const type = extension === 'vtt' ? 'text/vtt;charset=utf-8' : 'text/plain;charset=utf-8';
  setDownload(candidateDownload, selected.broken, `${selected.id}-candidate.${extension}`, type);
  setDownload(reviewedDownload, selected.corrected, `${selected.id}-reviewed.${extension}`, type);
}

select.addEventListener('change', () => {
  renderCase(select.value);
  history.replaceState(null, '', caseHash(select.value));
});

reveal.addEventListener('click', () => {
  setReviewVisible(answer.hidden);
});

share.addEventListener('click', async () => {
  const url = new URL(location.href);
  url.search = '';
  url.hash = caseHash(select.value);
  try {
    await navigator.clipboard.writeText(url.href);
    shareStatus.textContent = 'Case link copied.';
    shareFallback.hidden = true;
  } catch {
    const input = document.querySelector('#share-url');
    input.value = url.href;
    shareFallback.hidden = false;
    input.focus();
    input.select();
    shareStatus.textContent = 'Select and copy the link above.';
  }
});

window.addEventListener('hashchange', () => renderCase(caseFromHash(location.hash, cases.map(item => item.id))));
window.addEventListener('pagehide', releaseDownloads);
window.addEventListener('pageshow', event => {
  if (!event.persisted || !cases.length) return;
  const reviewVisible = !answer.hidden;
  renderCase(select.value);
  setReviewVisible(reviewVisible);
});

async function loadCases() {
  try {
    const response = await fetch('fixtures/manifest.json');
    if (!response.ok) throw new Error('Fixture request failed');
    const data = await response.json();
    const entries = Array.isArray(data) ? data : data.cases;
    if (!Array.isArray(entries) || !entries.length) throw new Error('No fixtures');
    const fields = ['id', 'title', 'kind', 'source', 'broken', 'corrected', 'explanation', 'review'];
    if (entries.some(item => fields.some(field => typeof item[field] !== 'string'))) throw new Error('Invalid fixture');
    cases = entries;
    select.replaceChildren(...cases.map(item => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.title;
      return option;
    }));
    select.disabled = false;
    reveal.disabled = false;
    share.disabled = false;
    renderCase(caseFromHash(location.hash, cases.map(item => item.id)));
  } catch {
    select.replaceChildren(new Option('Examples unavailable', ''));
    caseStatus.textContent = 'The fixture set could not be loaded. Refresh the page, or open the source repository to get the files.';
  }
}

const form = document.querySelector('#planner-form');
const matrixStatus = document.querySelector('#matrix-status');
const matrixRows = document.querySelector('#matrix-rows');
const matrixContainer = document.querySelector('#matrix-container');
const matrixDownload = document.querySelector('#download-matrix');
let matrix = [];

function plannerChoices() {
  const data = new FormData(form);
  return {
    changeType: data.get('changeType'),
    locales: data.getAll('locale'),
    deliverables: data.getAll('asset'),
    meaningChanged: data.has('meaningChanged'),
  };
}

function renderMatrix() {
  const choices = plannerChoices();
  document.querySelector('#meaning-option').hidden = choices.changeType !== 'on-screen';
  matrix = buildReviewMatrix(choices);
  matrixRows.replaceChildren();
  matrixContainer.hidden = !matrix.length;
  matrixDownload.disabled = !matrix.length;
  if (!matrix.length) {
    matrixStatus.textContent = 'Select at least one language and one deliverable.';
    return;
  }
  const reviews = matrix.filter(row => row.reviewRequired).length;
  matrixStatus.textContent = `${reviews} of ${matrix.length} selected deliverables need a review. Check dependencies for the remaining items.`;
  for (const item of matrix) {
    const row = document.createElement('tr');
    if (!item.reviewRequired) row.className = 'dependency-row';
    const language = document.createElement('td');
    language.textContent = item.language;
    const asset = document.createElement('td');
    asset.textContent = item.asset;
    const task = document.createElement('td');
    const status = document.createElement('span');
    status.className = 'row-status';
    status.textContent = item.reviewRequired ? 'Review' : 'Check dependencies';
    task.append(status, document.createTextNode(item.task));
    row.append(language, asset, task);
    matrixRows.append(row);
  }
}

form.addEventListener('change', renderMatrix);
form.addEventListener('submit', event => event.preventDefault());
matrixDownload.addEventListener('click', () => {
  if (!matrix.length) return;
  const choices = plannerChoices();
  const csv = matrixToCsv(matrix, choices.changeType, form.elements.sourceChange.value);
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'training-video-update-review.csv';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

renderMatrix();
void loadCases();
