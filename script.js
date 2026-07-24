const root = document.documentElement;
const body = document.body;
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const menuIcon = menuButton?.querySelector('i');
const mainNav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

root.classList.add('reveal-ready');

function closeMenu({ restoreFocus = false } = {}) {
  if (!mainNav?.classList.contains('is-open')) return;
  mainNav.classList.remove('is-open');
  header?.classList.remove('menu-active');
  body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  menuIcon?.classList.replace('ph-x', 'ph-list');
  if (restoreFocus) menuButton?.focus();
}

const desktopMenuMedia = window.matchMedia('(min-width: 941px)');
const syncMenuToViewport = (event) => {
  if (event.matches) closeMenu();
};

if (desktopMenuMedia.addEventListener) {
  desktopMenuMedia.addEventListener('change', syncMenuToViewport);
} else {
  desktopMenuMedia.addListener(syncMenuToViewport);
}

menuButton?.addEventListener('click', () => {
  const willOpen = !mainNav.classList.contains('is-open');
  mainNav.classList.toggle('is-open', willOpen);
  header?.classList.toggle('menu-active', willOpen);
  body.classList.toggle('menu-open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
  menuIcon?.classList.toggle('ph-list', !willOpen);
  menuIcon?.classList.toggle('ph-x', willOpen);
});

mainNav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mainNav?.classList.contains('is-open')) {
    event.preventDefault();
    closeMenu({ restoreFocus: true });
  }
});

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 28);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = [...document.querySelectorAll('[data-reveal]')];

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  });

  revealItems.forEach((item) => revealObserver.observe(item));
  requestAnimationFrame(() => {
    document.querySelector('[data-reveal="hero"]')?.classList.add('is-visible');
  });
}

const observedSections = ['home', 'services', 'about', 'productions']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;

    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.slice(1);
      link.classList.toggle('is-current', target === active.target.id);
    });
  }, {
    rootMargin: '-25% 0px -62% 0px',
    threshold: [0, 0.05, 0.25]
  });

  observedSections.forEach((section) => sectionObserver.observe(section));
}

let lastDialogTrigger = null;

function openDialog(dialog, trigger) {
  if (!(dialog instanceof HTMLDialogElement)) return;
  lastDialogTrigger = trigger || null;
  const openDialogElement = document.querySelector('dialog[open]');

  if (openDialogElement && openDialogElement !== dialog) {
    openDialogElement.close();
  }

  if (!dialog.open) {
    dialog.showModal();
    body.classList.add('dialog-open');
  }
}

document.querySelectorAll('[data-dialog-open]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const dialog = document.getElementById(trigger.dataset.dialogOpen);
    if (trigger.closest('#main-nav')) closeMenu();
    openDialog(dialog, trigger);
  });
});

document.querySelectorAll('.site-dialog').forEach((dialog) => {
  dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) {
      body.classList.remove('dialog-open');
    }

    if (lastDialogTrigger?.isConnected) {
      lastDialogTrigger.focus({ preventScroll: true });
    }
  });
});

document.getElementById('contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(`Production availability inquiry — ${data.get('company') || 'New production'}`);
  const bodyText = [
    `Production company: ${data.get('company')}`,
    `Contact name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Dates needed: ${data.get('dates') || 'Not provided'}`,
    `Production location: ${data.get('location') || 'Not provided'}`,
    `Minors: ${data.get('minors') || 'Not provided'}`,
    '',
    'Production details:',
    data.get('message') || 'Not provided'
  ].join('\n');

  const status = document.getElementById('form-status');
  if (status) status.textContent = 'Opening your email app with the inquiry filled in…';
  window.location.href = `mailto:support@onset-education.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
