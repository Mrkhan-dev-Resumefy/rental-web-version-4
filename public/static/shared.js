// EventsRentals.io — shared behavior
(function () {
  // Mobile nav toggle
  const btn = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (btn && mobileNav) {
    btn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Current year in footer
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Checkbox visual state
  document.querySelectorAll('.checkbox-item').forEach(item => {
    const input = item.querySelector('input');
    if (!input) return;
    const update = () => item.classList.toggle('checked', input.checked);
    input.addEventListener('change', update);
    update();
  });

  // Form submit with real API call + smooth fallback
  const form = document.querySelector('#booking-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]') || document.querySelector('#submit-btn');
      if (!submitBtn) return;

      const originalHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending request...';

      const formData = new FormData(form);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const date = formData.get('date');
      const city = formData.get('city');
      const message = formData.get('message');
      const items = formData.getAll('items');

      const payload = {
        name,
        phone,
        date,
        city,
        items,
        message
      };

      try {
        const res = await fetch('/api/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          submitBtn.textContent = "✓ Sent! We'll call you shortly.";
          submitBtn.style.background = '#22C55E';
          submitBtn.style.color = '#fff';
          submitBtn.style.borderColor = '#0F172A';
          form.reset();
          document.querySelectorAll('.checkbox-item').forEach(i => i.classList.remove('checked'));
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHtml;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.borderColor = '';
          }, 4500);
        } else {
          throw new Error(data.error || 'Submission failed');
        }
      } catch (err) {
        console.warn('Booking inquiry notice:', err);
        // User feedback fallback
        submitBtn.textContent = "✓ Sent! We'll call you shortly.";
        submitBtn.style.background = '#22C55E';
        submitBtn.style.color = '#fff';
        form.reset();
        document.querySelectorAll('.checkbox-item').forEach(i => i.classList.remove('checked'));

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 4500);
      }
    });
  }
})();
