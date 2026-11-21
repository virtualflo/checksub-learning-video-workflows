export const changeTypes = {
  terminology: 'Terminology changed',
  audio: 'Spoken audio changed',
  'on-screen': 'On-screen content changed',
  policy: 'Policy or instruction changed',
};

export const assetNames = {
  captions: 'Captions',
  dub: 'Dubbed audio',
  slides: 'Slides and on-screen text',
  quiz: 'Quiz',
};

const languageNames = { en: 'English', fr: 'French', de: 'German' };

export function reviewTask(changeType, asset, meaningChanged = false) {
  if (changeType === 'policy') return 'Review the instruction, its translation and approval against the new policy.';
  if (changeType === 'terminology') return 'Find the old term, apply the approved glossary and review it in context.';
  if (changeType === 'audio' && ['captions', 'dub'].includes(asset)) {
    return asset === 'captions'
      ? 'Update the transcript and translation, then check subtitle timing against the revised audio.'
      : 'Revise the translated script, regenerate or record the changed speech and check timing.';
  }
  if (changeType === 'on-screen' && asset === 'slides') return 'Replace the affected visual and review localized text and layout.';
  if (changeType === 'on-screen' && asset === 'quiz' && meaningChanged) return 'Review questions, answer choices and feedback against the changed meaning.';
  return null;
}

export function buildReviewMatrix({ changeType, locales = [], deliverables = [], meaningChanged = false }) {
  if (!Object.hasOwn(changeTypes, changeType)) throw new Error('Choose a supported change type.');
  const languages = [...new Set(locales)].filter(locale => Object.hasOwn(languageNames, locale));
  const assets = [...new Set(deliverables)].filter(asset => Object.hasOwn(assetNames, asset));
  return languages.flatMap(locale => assets.map(asset => {
    const task = reviewTask(changeType, asset, meaningChanged);
    return {
      locale,
      language: languageNames[locale],
      asset: assetNames[asset],
      reviewRequired: Boolean(task),
      task: task ?? 'Keep the existing asset unless dependencies or meaning also changed.',
    };
  }));
}

function csvCell(value) {
  const text = String(value ?? '');
  const safe = /^[\s\u0000-\u001f]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function matrixToCsv(rows, changeType, sourceChange = '') {
  const header = ['Source change', 'Change type', 'Language', 'Asset', 'Review required', 'Review task'];
  const data = rows.map(row => [sourceChange, changeTypes[changeType] ?? '', row.language, row.asset, row.reviewRequired ? 'Yes' : 'Check dependencies', row.task]);
  return '\uFEFF' + [header, ...data].map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

export function caseFromHash(hash, availableIds) {
  const id = new URLSearchParams(hash.replace(/^#/, '')).get('case');
  return availableIds.includes(id) ? id : availableIds[0] ?? null;
}

export function caseHash(id) {
  return '#case=' + encodeURIComponent(id);
}
