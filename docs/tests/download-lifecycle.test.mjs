import test from 'node:test';
import assert from 'node:assert/strict';

test('back-forward cache restoration recreates revoked downloads and keeps the selected review', async () => {
  const original = {
    document: globalThis.document,
    window: globalThis.window,
    location: globalThis.location,
    FormData: globalThis.FormData,
    fetch: globalThis.fetch,
    createObjectURL: URL.createObjectURL,
    revokeObjectURL: URL.revokeObjectURL,
  };
  const elements = new Map();
  const windowEvents = new Map();
  const revoked = [];
  let nextUrl = 0;

  class Element {
    constructor() {
      this.events = new Map();
      this.attributes = new Map();
      this.hidden = false;
      this.value = '';
    }
    addEventListener(name, callback) { this.events.set(name, callback); }
    setAttribute(name, value) { this.attributes.set(name, value); }
    replaceChildren() {}
    append() {}
  }

  try {
    globalThis.document = {
      querySelector(selector) {
        if (!elements.has(selector)) elements.set(selector, new Element());
        return elements.get(selector);
      },
      createElement() { return new Element(); },
      createTextNode(text) { return text; },
    };
    globalThis.window = { addEventListener(name, callback) { windowEvents.set(name, callback); } };
    globalThis.location = { hash: '#case=example' };
    globalThis.FormData = class {
      get() { return 'policy'; }
      getAll(name) { return name === 'locale' ? ['en'] : ['captions']; }
      has() { return false; }
    };
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ cases: [{ id: 'example', title: 'Example', kind: 'SRT', source: 'Fictional', broken: 'Candidate', corrected: 'Reviewed', explanation: 'Review', review: 'human' }] }),
    });
    URL.createObjectURL = () => `blob:fixture-${++nextUrl}`;
    URL.revokeObjectURL = url => revoked.push(url);
    await import('../app.mjs');
    await new Promise(resolve => setImmediate(resolve));

    const candidate = elements.get('#download-candidate');
    const reviewed = elements.get('#download-reviewed');
    const answer = elements.get('#case-answer');
    const reveal = elements.get('#reveal-case');
    const initial = [candidate.href, reviewed.href];
    assert.equal(initial.length, 2);
    assert.ok(initial.every(url => url.startsWith('blob:fixture-')));
    reveal.events.get('click')();
    assert.equal(answer.hidden, false);

    windowEvents.get('pagehide')();
    assert.deepEqual(revoked, initial);
    windowEvents.get('pageshow')({ persisted: true });
    assert.ok([candidate.href, reviewed.href].every(url => !revoked.includes(url)));
    assert.equal(elements.get('#case-select').value, 'example');
    assert.equal(answer.hidden, false);
    assert.equal(reveal.attributes.get('aria-expanded'), 'true');
    assert.equal(nextUrl, 4);
    windowEvents.get('pageshow')({ persisted: false });
    assert.equal(nextUrl, 4);
  } finally {
    for (const name of ['document', 'window', 'location', 'FormData', 'fetch']) {
      if (original[name] === undefined) delete globalThis[name];
      else globalThis[name] = original[name];
    }
    URL.createObjectURL = original.createObjectURL;
    URL.revokeObjectURL = original.revokeObjectURL;
  }
});
