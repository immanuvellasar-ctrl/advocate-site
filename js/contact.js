/* js/contact.js */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('visible'); }
  }
  function clearErr(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('visible');
  }

  ['name','phone','area','message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => { clearErr(id + 'Err'); el.classList.remove('error'); });
  });

  form.addEventListener('submit', function(e) {
    let valid = true;

    const name = document.getElementById('name');
    if (!name || name.value.trim().length < 2) {
      showErr('nameErr', 'Please enter your full name.');
      name && name.classList.add('error'); valid = false;
    } else clearErr('nameErr');

    const phone = document.getElementById('phone');
    if (!phone || phone.value.replace(/\s/g,'').length < 8) {
      showErr('phoneErr', 'Please enter a valid phone number.');
      phone && phone.classList.add('error'); valid = false;
    } else clearErr('phoneErr');

    const area = document.getElementById('area');
    if (!area || !area.value) {
      showErr('areaErr', 'Please select a legal area.');
      area && area.classList.add('error'); valid = false;
    } else clearErr('areaErr');

    const msg = document.getElementById('message');
    if (!msg || msg.value.trim().length < 20) {
      showErr('msgErr', 'Please describe your case (at least 20 characters).');
      msg && msg.classList.add('error'); valid = false;
    } else clearErr('msgErr');

    if (!valid) {
      e.preventDefault();
      const firstErr = form.querySelector('.error');
      if (firstErr) {
        const top = firstErr.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      return;
    }

    const btn = document.getElementById('submitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
  });
});
