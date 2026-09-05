(() => {
  'use strict';
  const views = [...document.querySelectorAll('.view')];
  const links = [...document.querySelectorAll('[data-view]')];
  const labels = {top: 'Studio', services: 'Projects', packages: 'Websites', desk: 'The Trading Desk', about: 'About', contact: 'Contact'};
  const aliases = {projects:'services', websites:'packages', trading:'desk'};
  const menu = document.getElementById('menu-toggle');
  const workspace = document.getElementById('workspace');
  const baseTitle = document.title;
  let active = '';
  function closeMenu(returnFocus = false) {
    document.body.classList.remove('nav-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    if (returnFocus) menu.focus();
  }
  function route(focus = true) {
    const hash = location.hash.slice(1);
    const target = aliases[hash] || hash;
    const id = Object.hasOwn(labels, target) ? target : 'top';
    for (const view of views) view.hidden = view.id !== id;
    document.documentElement.classList.add('js-views');
    for (const link of links) {
      if (link.dataset.view === id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    document.getElementById('view-label').textContent = labels[id];
    document.title = id === 'top' ? baseTitle : labels[id] + ' — Safi Solutions';
    closeMenu();
    if (active !== id) {
      window.scrollTo({top: 0, behavior: 'instant'});
      if (focus) workspace.focus({preventScroll: true});
    }
    active = id;
  }
  menu.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) document.querySelector('.studio-nav [aria-current="page"]').focus();
  });
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
    if (event.key === 'Tab') {
      const controls = [...document.querySelectorAll('.studio-nav a'), menu];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.sidebar, #menu-toggle')) closeMenu();
    const link = event.target.closest('a[href^="#"]');
    if (link?.classList.contains('skip-link')) {event.preventDefault(); workspace.focus(); return;}
    if (link && link.getAttribute('href') === location.hash && link.getAttribute('href') !== '#workspace') {
      route(); workspace.focus({preventScroll: true});
    }
  });
  const mobile = matchMedia('(max-width: 700px)');
  mobile.addEventListener('change', () => closeMenu());
  window.addEventListener('hashchange', () => route());
  route(false);
  const selectors = [...document.querySelectorAll('[data-feature]')];
  selectors.forEach(button => button.addEventListener('click', () => {
    selectors.forEach(item => {
      const selected = item === button;
      item.setAttribute('aria-pressed', String(selected));
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }));
  const motion = document.getElementById('motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  try { paused = reduced.matches || localStorage.getItem('safi.motion') === 'paused'; } catch (_) {}
  function applyMotion() {
    document.documentElement.classList.toggle('motion-paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    motion.disabled = reduced.matches;
  }
  motion.addEventListener('click', () => {
    paused = !paused; applyMotion();
    try { localStorage.setItem('safi.motion', paused ? 'paused' : 'playing'); } catch (_) {}
  });
  reduced.addEventListener('change', () => {paused = reduced.matches; applyMotion();});
  applyMotion();
  document.getElementById('year').textContent = new Date().getFullYear();
})();
