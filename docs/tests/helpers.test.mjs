import test from 'node:test';
import assert from 'node:assert/strict';
import { buildReviewMatrix, matrixToCsv, caseFromHash, caseHash } from '../helpers.mjs';

test('policy changes cover every selected language and asset exactly once', () => {
  const rows = buildReviewMatrix({ changeType: 'policy', locales: ['en', 'fr', 'de', 'fr', 'bad'], deliverables: ['captions', 'dub', 'slides', 'quiz', 'quiz'] });
  assert.equal(rows.length, 12);
  assert.ok(rows.every(row => row.reviewRequired));
  assert.equal(new Set(rows.map(row => row.locale + row.asset)).size, 12);
});

test('audio affects captions and dubbing, while visual meaning controls quiz review', () => {
  const rows = buildReviewMatrix({ changeType: 'audio', locales: ['en'], deliverables: ['captions', 'dub', 'slides', 'quiz'] });
  assert.deepEqual(rows.map(row => row.reviewRequired), [true, true, false, false]);
  const quiz = meaningChanged => buildReviewMatrix({ changeType: 'on-screen', locales: ['fr'], deliverables: ['slides', 'quiz'], meaningChanged });
  assert.deepEqual(quiz(false).map(row => row.reviewRequired), [true, false]);
  assert.deepEqual(quiz(true).map(row => row.reviewRequired), [true, true]);
});

test('terminology spans selected assets, unsupported changes fail and empty choices produce no rows', () => {
  assert.ok(buildReviewMatrix({ changeType: 'terminology', locales: ['de'], deliverables: ['captions', 'quiz'] }).every(row => row.reviewRequired));
  assert.throws(() => buildReviewMatrix({ changeType: 'unsupported' }), /supported/);
  assert.deepEqual(buildReviewMatrix({ changeType: 'policy', locales: [], deliverables: ['captions'] }), []);
});

test('CSV quotes commas, quotes and newlines and neutralizes formula-leading user input', () => {
  const rows = buildReviewMatrix({ changeType: 'policy', locales: ['fr'], deliverables: ['captions'] });
  const csv = matrixToCsv(rows, 'policy', ' =SUM(1,2)\n"revision"');
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('"\' =SUM(1,2)\n""revision"""'));
  for (const value of ['+cmd', '-1+1', '@SUM(1)', '\t=HYPERLINK(1)']) assert.ok(matrixToCsv(rows, 'policy', value).includes('"\'' + value + '"'));
});

test('shared case hash only resolves known fixture ids', () => {
  const ids = ['negative-duration', 'lost-negation'];
  assert.equal(caseFromHash(caseHash(ids[1]), ids), ids[1]);
  assert.equal(caseFromHash('#case=%3Cscript%3E', ids), ids[0]);
  assert.equal(caseFromHash('#unrelated', []), null);
});
