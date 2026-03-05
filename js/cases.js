/* js/cases.js */
document.addEventListener('DOMContentLoaded', function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.case-card');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      cards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        if (match) {
          card.style.display = 'block';
          void card.offsetWidth;
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => { card.style.display = 'none'; }, 320);
        }
      });
    });
  });
});
