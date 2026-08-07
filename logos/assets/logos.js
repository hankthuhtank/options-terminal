/* ============================================================
   LOGOS · behaviour
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  const BOXES   = window.LOGOS_BOXES   || [];
  const PROMPTS = window.LOGOS_PROMPTS || [];

  const state = { box: null, query: '' };

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('up'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('up'), 1900);
  }

  /* ============================================================
     THE CASE · bins sized by what they hold
     ============================================================ */
  function countFor(id) { return PROMPTS.filter(p => p.box === id).length; }

  function buildCase() {
    const host = $('#case');
    if (!host) return;

    // Bin width tracks contents, which is how a real job case works:
    // the compartments you reach into most get the biggest bins.
    // A real case is also fully partitioned, so widths are then nudged up
    // (largest bins first) until they tile the drawer with no holes.
    const COLS = 8;
    const counts = BOXES.map(b => countFor(b.id));
    const max = Math.max.apply(null, counts.concat([1]));

    const spans = counts.map(n => {
      const r = n / max;
      return r > 0.72 ? 3 : r > 0.42 ? 2 : 1;
    });

    const byCount = counts
      .map((n, i) => ({ n, i }))
      .sort((a, b) => b.n - a.n)
      .map(x => x.i);

    let guard = 0;
    while (spans.reduce((a, b) => a + b, 0) % COLS !== 0 && guard++ < 60) {
      for (const i of byCount) {
        if (spans[i] < 4) { spans[i]++; break; }
      }
    }

    // Lay the bins out row by row, each row filled to exactly the full width.
    // Greedy largest-that-fits; falls back to source order if a row cannot close.
    function packRows(items, width) {
      const pool = items.slice().sort((a, b) => b.span - a.span);
      const laid = [];
      while (pool.length) {
        let rem = width;
        const row = [];
        while (rem > 0) {
          const k = pool.findIndex(x => x.span <= rem);
          if (k === -1) break;
          rem -= pool[k].span;
          row.push(pool.splice(k, 1)[0]);
        }
        if (rem !== 0 && pool.length) return null; // could not close a row cleanly
        laid.push.apply(laid, row);
      }
      return laid;
    }

    const items = BOXES.map((b, i) => ({ box: b, n: counts[i], span: spans[i] }));
    const laid = packRows(items, COLS) || items;

    host.innerHTML = laid.map((it) => {
      return `<button class="bin" type="button" data-box="${it.box.id}" data-span="${it.span}"
                aria-pressed="false" title="${esc(it.box.note)}">
                <span class="bin__n">${it.n}</span>
                <span class="bin__glyph" aria-hidden="true">${esc(it.box.glyph)}</span>
                <span class="bin__name">${esc(it.box.name)}</span>
              </button>`;
    }).join('');

    host.addEventListener('click', (e) => {
      const bin = e.target.closest('.bin');
      if (!bin) return;
      const id = bin.dataset.box;
      state.box = (state.box === id) ? null : id;
      state.query = '';
      const input = $('#q'); if (input) input.value = '';
      paintCase();
      renderGalley();
      const g = $('#galley');
      if (g) g.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function paintCase() {
    $$('.bin').forEach(b => {
      const on = b.dataset.box === state.box;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /* ============================================================
     FILTERING
     ============================================================ */
  function matches(p) {
    if (state.box && p.box !== state.box) return false;
    const q = state.query.trim().toLowerCase();
    if (!q) return true;
    const hay = [
      p.title, p.blurb, p.body, p.fit,
      (p.tech || []).join(' '),
      (p.vars || []).join(' '),
      (BOXES.find(b => b.id === p.box) || {}).name || ''
    ].join(' ').toLowerCase();
    return q.split(/\s+/).every(w => hay.includes(w));
  }

  /* ============================================================
     THE GALLEY · set sorts ready to pull
     ============================================================ */
  function quadMeter(w) {
    let out = '';
    for (let i = 1; i <= 3; i++) out += `<span class="quad${i <= w ? ' f' : ''}"></span>`;
    return `<span class="quads" title="Length: ${['short','medium','long'][w-1] || 'medium'}" aria-label="Length ${w} of 3">${out}</span>`;
  }

  // render prompt body with [SLOTS] as editable fields
  function setBody(p) {
    let html = esc(p.body);
    (p.vars || []).forEach(v => {
      const re = new RegExp('\\[' + v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\]', 'g');
      html = html.replace(re,
        `<span class="slot" contenteditable="true" spellcheck="false" data-slot="${esc(v)}"
           role="textbox" aria-label="${esc(v.toLowerCase().replace(/_/g,' '))}">${esc(v.toLowerCase().replace(/_/g, ' '))}</span>`);
    });
    return html;
  }

  function sortCard(p) {
    const box = BOXES.find(b => b.id === p.box) || { glyph: '·' };
    const tags = (p.tech || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');
    const nvars = (p.vars || []).length;
    return `<article class="sort" id="sort-${esc(p.id)}">
      <button class="sort__head" type="button" aria-expanded="false">
        <span class="sort__cap" aria-hidden="true">${esc(box.glyph)}</span>
        <span class="sort__t">
          <h3 class="sort__title">${esc(p.title)}</h3>
          <p class="sort__blurb">${esc(p.blurb)}</p>
        </span>
        ${quadMeter(p.weight || 2)}
      </button>
      <div class="sort__body">
        <div class="sort__meta">
          ${tags}
          <span class="tag fit">${esc(p.fit)}</span>
        </div>
        <div class="sheet" data-sheet>${setBody(p)}</div>
        ${nvars ? `<p class="slot-note">${nvars} slot${nvars > 1 ? 's' : ''} to fill. Click any dashed field and type. Your text is copied with the prompt.</p>` : ''}
        <div class="sort__acts">
          <button class="btn btn--ink" type="button" data-copy>Copy prompt</button>
          ${nvars ? `<button class="btn" type="button" data-reset>Reset slots</button>` : ''}
        </div>
      </div>
    </article>`;
  }

  function renderGalley() {
    const wrap = $('#sorts');
    const bar  = $('#galleyBar');
    if (!wrap) return;

    const list = PROMPTS.filter(matches);
    const boxObj = state.box ? BOXES.find(b => b.id === state.box) : null;

    if (bar) {
      const title = boxObj ? boxObj.name : (state.query ? 'Search' : 'Every sort in the case');
      const note  = boxObj ? boxObj.note : (state.query ? `matching "${esc(state.query)}"` : 'Pull a compartment above, or search.');
      bar.innerHTML = `<h3 class="galley__title">${esc(title)}</h3>
        <span class="galley__note">${note}</span>
        ${(state.box || state.query) ? '<button class="galley__clear" type="button" id="clearAll">Empty galley</button>' : ''}`;
      const c = $('#clearAll');
      if (c) c.addEventListener('click', () => {
        state.box = null; state.query = '';
        const i = $('#q'); if (i) i.value = '';
        paintCase(); renderGalley(); updateCount();
      });
    }

    wrap.innerHTML = list.length
      ? list.map(sortCard).join('')
      : `<div class="empty">Out of sorts. Nothing here matches that.<br>Try a different word, or empty the galley to see everything.</div>`;

    updateCount(list.length);
  }

  function updateCount(n) {
    const el = $('#count');
    if (!el) return;
    const total = PROMPTS.length;
    const shown = (typeof n === 'number') ? n : PROMPTS.filter(matches).length;
    el.innerHTML = (shown === total)
      ? `<b>${total}</b> sorts in the case`
      : `<b>${shown}</b> of ${total} sorts`;
  }

  /* ---------- galley interactions (delegated) ---------- */
  function wireGalley() {
    const wrap = $('#sorts');
    if (!wrap) return;

    wrap.addEventListener('click', (e) => {
      const head = e.target.closest('.sort__head');
      if (head) {
        const card = head.closest('.sort');
        const open = card.classList.toggle('open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
        return;
      }

      const copyBtn = e.target.closest('[data-copy]');
      if (copyBtn) {
        const sheet = $('[data-sheet]', copyBtn.closest('.sort'));
        const text = sheet ? sheet.innerText : '';
        navigator.clipboard.writeText(text).then(() => {
          copyBtn.classList.add('ok');
          copyBtn.textContent = 'Copied';
          toast('Pulled a proof');
          setTimeout(() => { copyBtn.classList.remove('ok'); copyBtn.textContent = 'Copy prompt'; }, 1600);
        }).catch(() => toast('Copy blocked by browser'));
        return;
      }

      const resetBtn = e.target.closest('[data-reset]');
      if (resetBtn) {
        $$('.slot', resetBtn.closest('.sort')).forEach(s => {
          s.textContent = s.dataset.slot.toLowerCase().replace(/_/g, ' ');
          s.classList.remove('done');
        });
        toast('Slots reset');
      }
    });

    // first click into a slot clears the placeholder
    wrap.addEventListener('focusin', (e) => {
      const slot = e.target.closest('.slot');
      if (!slot || slot.classList.contains('done')) return;
      slot.textContent = '';
    });

    wrap.addEventListener('focusout', (e) => {
      const slot = e.target.closest('.slot');
      if (!slot) return;
      const val = slot.textContent.trim();
      if (!val) {
        slot.textContent = slot.dataset.slot.toLowerCase().replace(/_/g, ' ');
        slot.classList.remove('done');
      } else {
        slot.classList.add('done');
      }
    });

    // keep slots single-line, no pasted markup
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.closest('.slot')) { e.preventDefault(); e.target.blur(); }
    });
    wrap.addEventListener('paste', (e) => {
      const slot = e.target.closest('.slot');
      if (!slot) return;
      e.preventDefault();
      const txt = (e.clipboardData || window.clipboardData).getData('text').replace(/\s+/g, ' ');
      document.execCommand('insertText', false, txt);
    });
  }

  /* ---------- search ---------- */
  function wireSearch() {
    const input = $('#q');
    if (!input) return;
    let t;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        state.query = input.value;
        if (state.query.trim()) { state.box = null; paintCase(); }
        renderGalley();
      }, 130);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName) && !document.activeElement.isContentEditable) {
        e.preventDefault(); input.focus(); input.select();
      }
      if (e.key === 'Escape' && document.activeElement === input) { input.value = ''; state.query = ''; renderGalley(); input.blur(); }
    });
  }

  /* ============================================================
     THE COMPOSING STICK · build a prompt one piece at a time
     ============================================================ */
  const PIECES = [
    { id:'task', name:'The task', req:true,
      why:'Lead with a verb and say what the output must contain, not just the topic.',
      ph:'Write a 600 word explainer on X for a reader who knows Y. Include a worked example.' },
    { id:'context', name:'The material', req:false,
      why:'Anything supplied goes before the instruction. Paste it, or say what you will attach.',
      ph:'Here is the draft / dataset / transcript to work from:' },
    { id:'why', name:'Purpose and reader', req:false,
      why:'The reason is what lets the model handle the cases you did not think to mention.',
      ph:'This goes to prospective clients who have never heard of us, so it has to earn attention in the first line.' },
    { id:'limits', name:'Constraints', req:false,
      why:'Stated positively where you can. Keep hard bans for things that are genuinely never acceptable.',
      ph:'Under 600 words. Flowing prose, not bullets. No em dashes as pauses.' },
    { id:'shape', name:'Output shape', req:false,
      why:'Name the format precisely. If it must be parsed, say so and say what to do with missing values.',
      ph:'A table with columns A, B, C, then three paragraphs of commentary underneath.' },
    { id:'steps', name:'Reasoning order', req:false,
      why:'Guided chain of thought. Skip it if the model has extended thinking and the task is simple.',
      ph:'First identify the assumptions. Then test each against the data. Then write the conclusion.' },
    { id:'unknown', name:'Uncertainty license', req:false,
      why:'The highest return sentence in this whole builder. It makes gaps visible instead of filled.',
      ph:'If the material is insufficient, say so rather than speculating. Mark anything you are inferring rather than reading.' },
    { id:'bad', name:'What failure looks like', req:false,
      why:'Often more informative than describing success. Name the specific wrong answer you keep getting.',
      ph:'A bad version would be generic enough to apply to any company. Avoid that.' }
  ];

  function buildStick() {
    const host = $('#pieces');
    if (!host) return;

    host.innerHTML = PIECES.map(p => `
      <div class="piece" data-piece="${p.id}">
        <label class="piece__top">
          <input type="checkbox" ${p.req ? 'checked' : ''} data-toggle>
          <span class="piece__name">${esc(p.name)}</span>
          ${p.req ? '<span class="piece__req">Required</span>' : ''}
        </label>
        <p class="piece__why">${esc(p.why)}</p>
        <textarea rows="2" placeholder="${esc(p.ph)}" data-field></textarea>
      </div>`).join('');

    // required pieces start open
    $$('.piece', host).forEach(el => {
      if ($('[data-toggle]', el).checked) el.classList.add('on');
    });

    host.addEventListener('change', (e) => {
      if (!e.target.matches('[data-toggle]')) return;
      const piece = e.target.closest('.piece');
      piece.classList.toggle('on', e.target.checked);
      if (e.target.checked) { const ta = $('[data-field]', piece); if (ta) ta.focus(); }
      compose();
    });
    host.addEventListener('input', (e) => { if (e.target.matches('[data-field]')) compose(); });

    const copyBtn = $('#stickCopy');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      const text = $('#stickOut').innerText;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('ok'); copyBtn.textContent = 'Copied';
        toast('Locked up and pulled');
        setTimeout(() => { copyBtn.classList.remove('ok'); copyBtn.textContent = 'Copy prompt'; }, 1600);
      }).catch(() => toast('Copy blocked by browser'));
    });

    const clearBtn = $('#stickClear');
    if (clearBtn) clearBtn.addEventListener('click', () => {
      $$('.piece').forEach(el => {
        const cb = $('[data-toggle]', el);
        const req = !!$('.piece__req', el);
        cb.checked = req; el.classList.toggle('on', req);
        $('[data-field]', el).value = '';
      });
      compose(); toast('Stick emptied');
    });

    compose();
  }

  function compose() {
    const out = $('#stickOut');
    if (!out) return;

    const parts = [];
    PIECES.forEach(p => {
      const el = $(`.piece[data-piece="${p.id}"]`);
      if (!el || !$('[data-toggle]', el).checked) return;
      const v = $('[data-field]', el).value.trim();
      if (v) parts.push({ id: p.id, v });
    });

    if (!parts.length) {
      out.textContent = 'Nothing set yet. Tick a piece on the left and write into it. The prompt assembles here in the order the model reads best: material first, then the task, then how to handle it.';
      out.style.opacity = '.5';
      gauge(0);
      return;
    }
    out.style.opacity = '1';

    // assembly order matters: context before instruction
    const order = ['context', 'why', 'task', 'steps', 'shape', 'limits', 'bad', 'unknown'];
    const get = (id) => (parts.find(x => x.id === id) || {}).v;

    const lines = [];
    order.forEach(id => {
      const v = get(id);
      if (!v) return;
      if (id === 'context') lines.push(v + '\n');
      else if (id === 'why') lines.push('Context: ' + v + '\n');
      else if (id === 'task') lines.push(v + '\n');
      else if (id === 'steps') lines.push('Work in this order. ' + v + '\n');
      else if (id === 'shape') lines.push('Output: ' + v + '\n');
      else if (id === 'limits') lines.push('Constraints: ' + v + '\n');
      else if (id === 'bad') lines.push('Avoid this failure mode: ' + v + '\n');
      else if (id === 'unknown') lines.push(v);
    });

    const text = lines.join('\n').trim();
    out.textContent = text;
    gauge(text.length);
  }

  function gauge(chars) {
    const fill = $('#measureFill');
    const lbl  = $('#measureLabel');
    if (!fill) return;
    // ~1600 chars is a comfortable working measure for a single-task prompt
    const pct = Math.min(100, (chars / 1600) * 100);
    fill.style.width = pct + '%';
    const over = chars > 1600;
    fill.classList.toggle('warn', over);
    if (lbl) {
      lbl.textContent = !chars ? 'empty stick'
        : over ? `${chars} chars · over the measure, consider splitting`
        : `${chars} chars · ${Math.round(pct)}% of measure`;
    }
  }

  /* ============================================================
     STATIC SECTIONS
     ============================================================ */
  function buildTechniques() {
    const host = $('#techs');
    if (!host || !window.LOGOS_TECHNIQUES) return;
    host.innerHTML = window.LOGOS_TECHNIQUES.map(t => {
      const cls = t.rank === 'Foundational' ? 'f' : t.rank === 'Current practice' ? 'c' : '';
      return `<article class="tech">
        <div class="tech__rank ${cls}">${esc(t.rank)}</div>
        <h3>${esc(t.name)}</h3>
        <p class="tech__line">${esc(t.line)}</p>
        <div class="tech__detail">${esc(t.detail)}</div>
        <div class="tech__foot">
          <b>Reach for it</b><br>${esc(t.when)}<br>
          <b>Costs</b><br>${esc(t.cost)}
        </div>
      </article>`;
    }).join('');
  }

  function buildThenNow() {
    const host = $('#thennow');
    if (!host || !window.LOGOS_THENNOW) return;
    host.innerHTML = window.LOGOS_THENNOW.map(r => `
      <div class="tn__row">
        <button class="tn__top" type="button" aria-expanded="false">
          <span class="tn__then">${esc(r.then)}</span>
          <span class="tn__arrow" aria-hidden="true">&rarr;</span>
          <span class="tn__now">${esc(r.now)}</span>
          <span class="tn__verdict">${esc(r.verdict)}</span>
        </button>
        <div class="tn__body">${esc(r.body)}</div>
      </div>`).join('');
    host.addEventListener('click', (e) => {
      const top = e.target.closest('.tn__top');
      if (!top) return;
      const row = top.closest('.tn__row');
      const open = row.classList.toggle('open');
      top.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function buildStack() {
    const host = $('#stack');
    if (!host || !window.LOGOS_STACK) return;
    host.innerHTML = window.LOGOS_STACK.map(s => `
      <article class="piece-card">
        <h3>${esc(s.name)}</h3>
        <div class="piece-card__exp">${esc(s.expand)}</div>
        <p class="piece-card__role">${esc(s.role)}</p>
        <div class="piece-card__body">${esc(s.body)}</div>
        <div class="piece-card__foot">
          <div class="note"><b>Use it for</b>${esc(s.use)}</div>
          <div class="note warn"><b>Watch</b>${esc(s.caution)}</div>
        </div>
      </article>`).join('');
  }

  function buildFailures() {
    const host = $('#fails');
    if (!host || !window.LOGOS_FAILURES) return;
    host.innerHTML = window.LOGOS_FAILURES.map(f => `
      <article class="fail">
        <button class="fail__top" type="button" aria-expanded="false">
          <span class="sev ${esc(f.severity)}" title="${esc(f.severity)}"></span>
          <span class="fail__t">
            <h3>${esc(f.name)}</h3>
            <p class="fail__line">${esc(f.line)}</p>
          </span>
        </button>
        <div class="fail__body">${esc(f.body)}
          <div class="fail__fix"><b>What actually helps</b>${esc(f.fix)}</div>
        </div>
      </article>`).join('');
    host.addEventListener('click', (e) => {
      const top = e.target.closest('.fail__top');
      if (!top) return;
      const card = top.closest('.fail');
      const open = card.classList.toggle('open');
      top.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function buildRouting() {
    const R = window.LOGOS_ROUTING;
    if (!R) return;
    const pre = $('#routePre'); if (pre) pre.textContent = R.preamble;
    const ax = $('#axes');
    if (ax) ax.innerHTML = R.axes.map(a => `
      <div class="axis">
        <div class="axis__n">${esc(a.axis)}</div>
        <div class="axis__v"><b>Low</b>${esc(a.low)}</div>
        <div class="axis__v hi"><b>High</b>${esc(a.high)}</div>
      </div>`).join('');
    const rl = $('#routeRules');
    if (rl) rl.innerHTML = R.rules.map(r => `<li>${esc(r)}</li>`).join('');
  }

  function buildGlossary() {
    const host = $('#gloss');
    if (!host || !window.LOGOS_GLOSSARY) return;
    host.innerHTML = window.LOGOS_GLOSSARY.map(g => `
      <div class="gl">
        <div class="gl__t">${esc(g.term)}</div>
        <div class="gl__p">${esc(g.press)}</div>
        <div class="gl__h">${esc(g.here)}</div>
      </div>`).join('');
  }

  /* ---------- rail scroll spy ---------- */
  function wireRail() {
    const links = $$('.rail a[href^="#"]');
    const secs = links.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    if (!secs.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* ---------- boot ---------- */
  function init() {
    buildCase();
    wireSearch();
    wireGalley();
    renderGalley();
    buildStick();
    buildTechniques();
    buildThenNow();
    buildStack();
    buildFailures();
    buildRouting();
    buildGlossary();
    wireRail();

    const bc = $('#boxCount'); if (bc) bc.textContent = BOXES.length;
    const pc = $('#promptCount'); if (pc) pc.textContent = PROMPTS.length;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
