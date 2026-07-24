const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close main menu' : 'Open main menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open main menu');
}));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('inquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Production availability inquiry — ${data.get('company') || 'New production'}`);
  const body = encodeURIComponent([
    `Production company: ${data.get('company')}`,
    `Contact name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Dates needed: ${data.get('dates') || 'Not provided'}`,
    `Production location: ${data.get('location') || 'Not provided'}`,
    `Minors: ${data.get('minors') || 'Not provided'}`,
    '',
    'Production details:',
    data.get('message') || 'Not provided'
  ].join('\n'));
  document.getElementById('form-status').textContent = 'Opening your email app with the inquiry filled in…';
  window.location.href = `mailto:heather@example.com?subject=${subject}&body=${body}`;
});
