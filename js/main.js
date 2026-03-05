/* ============================================
   ADVOCATE SITE — Main JS
   File: js/main.js
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* Navbar scroll */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* Hamburger */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          let delay = 0;
          siblings.forEach((s, i) => { if (s === entry.target) delay = i * 80; });
          setTimeout(() => entry.target.classList.add('visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  /* Smooth scroll for anchors */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* Pre-select area from URL param */
  const areaSelect = document.getElementById('area');
  if (areaSelect) {
    const param = new URLSearchParams(window.location.search).get('area');
    if (param) {
      Array.from(areaSelect.options).forEach(opt => {
        if (opt.value.toLowerCase().includes(param.toLowerCase())) opt.selected = true;
      });
    }
    if (new URLSearchParams(window.location.search).get('success') === '1') {
      const s = document.getElementById('formSuccess');
      if (s) s.style.display = 'block';
    }
  }
});
