document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initOrderButton();
  initNewsletterForm();
});

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initOrderButton() {
  const orderBtn = document.getElementById('order-btn');

  if (!orderBtn) return;

  orderBtn.addEventListener('click', () => {
    alert('Bestelfunctionaliteit volgt binnenkort. Bedankt voor uw interesse in Schaduwen over Domburg.');
  });
}

function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const message = document.getElementById('form-message');

  if (!form || !message) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('#email');
    const email = emailInput.value.trim();

    message.classList.remove('success', 'error', 'info');

    if (!email || !isValidEmail(email)) {
      message.textContent = 'Voer een geldig e-mailadres in.';
      message.classList.add('error');
      emailInput.focus();
      return;
    }

    message.textContent = 'De nieuwsbrief is nog niet actief. Uw e-mailadres is niet opgeslagen.';
    message.classList.add('info');
    form.reset();
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
