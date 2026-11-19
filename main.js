// BlackCodex Creative site script.
// No inline scripts, no external requests, no innerHTML. Everything here is safe under a strict CSP.

(function () {
  'use strict';

  // Refuse to run inside someone else's frame (clickjacking protection)
  if (window.top !== window.self) {
    document.documentElement.hidden = true;
    try { window.top.location = window.self.location; } catch (e) { /* blocked by browser */ }
    return;
  }

  const root = document.documentElement;
  root.classList.add('js');

  // Business details used by the contact form
  const WHATSAPP_NUMBER = '265894640231';
  const EMAIL = 'blackcodexcreative@gmail.com';

  // Mobile menu
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = root.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        root.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Menu';
      }
    });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) {
        root.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Menu';
        menuBtn.focus();
      }
    });
  }

  // Year in footer
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Hero lens (loaded after the page, skipped on data saver)
  const canvas = document.getElementById('lens-canvas');
  if (canvas) {
    const conn = navigator.connection;
    const saveData = conn && conn.saveData;
    if (!saveData) startLens(canvas);
  }

  async function startLens(canvasEl) {
    try {
      if (document.readyState !== 'complete') {
        await new Promise((resolve) => addEventListener('load', resolve, { once: true }));
      }
      try { await document.fonts.load('600 34px "Instrument Sans"'); } catch (e) { /* font optional */ }
      const mod = await import('./lens.js');
      const api = mod.startLens(canvasEl);
      if (!api) return;
      root.classList.add('webgl-ready');

      const stops = document.querySelectorAll('[data-stop]');
      stops.forEach((btn) => {
        btn.addEventListener('click', () => {
          api.setStop(btn.dataset.stop);
          stops.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        });
      });
    } catch (err) {
      // The static lens illustration stays in place
      console.warn('3D lens not available', err);
    }
  }

  // Project dialog
  const dialog = document.getElementById('project-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const titleEl = dialog.querySelector('[data-dialog-title]');
    const typeEl = dialog.querySelector('[data-dialog-type]');
    const descEl = dialog.querySelector('[data-dialog-desc]');
    const videoEl = dialog.querySelector('[data-dialog-video]');

    document.querySelectorAll('[data-project]').forEach((btn) => {
      btn.addEventListener('click', () => {
        titleEl.textContent = btn.dataset.title || '';
        typeEl.textContent = btn.dataset.type || '';
        descEl.textContent = btn.dataset.desc || '';
        videoEl.textContent = '';
        const src = btn.dataset.video || '';
        if (src.indexOf('https://www.youtube-nocookie.com/embed/') === 0) {
          const frame = document.createElement('iframe');
          frame.src = src;
          frame.title = btn.dataset.title || 'Project video';
          frame.loading = 'lazy';
          frame.allow = 'fullscreen; picture-in-picture';
          frame.referrerPolicy = 'strict-origin-when-cross-origin';
          frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
          videoEl.appendChild(frame);
        }
        dialog.showModal();
      });
    });

    const close = () => {
      videoEl.textContent = '';
      dialog.close();
    };
    dialog.querySelector('[data-dialog-close]').addEventListener('click', close);
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    dialog.addEventListener('close', () => { videoEl.textContent = ''; });
  }

  // Contact form: builds a message on the visitor's own device and opens WhatsApp or email.
  // Nothing is sent to or stored on a server.
  const form = document.getElementById('booking-form');
  if (form) {
    const clean = (value, max) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

    const buildMessage = () => {
      const name = clean(form.elements.name.value, 80);
      const need = clean(form.elements.need.value, 80);
      const when = clean(form.elements.when.value, 120);
      const details = clean(form.elements.details.value, 800);
      const lines = [
        'Hello BlackCodex Creative, my name is ' + name + '.',
        'I need: ' + need + '.'
      ];
      if (when) lines.push('Date and place: ' + when + '.');
      if (details) lines.push(details);
      return lines.join('\n');
    };

    const go = (kind) => {
      if (!form.reportValidity()) return;
      const text = buildMessage();
      if (kind === 'whatsapp') {
        window.location.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      } else {
        window.location.href = 'mailto:' + EMAIL +
          '?subject=' + encodeURIComponent('Booking enquiry: ' + clean(form.elements.need.value, 80)) +
          '&body=' + encodeURIComponent(text);
      }
    };

    form.addEventListener('submit', (e) => { e.preventDefault(); go('whatsapp'); });
    const emailBtn = form.querySelector('[data-send-email]');
    if (emailBtn) emailBtn.addEventListener('click', () => go('email'));
  }
})();
