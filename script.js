// script.js
document.addEventListener('DOMContentLoaded', function () {
  // 1) Nav active link based on current location
  (function setActiveNav() {
    const navLinks = document.querySelectorAll('.header-nav a');
    // Get current file name or 'index.html' for root
    const path = window.location.pathname.split('/').pop() || 'index.html';

    // Normalize: if path is empty (served as '/'), treat as index.html
    const current = path === '' ? 'index.html' : path;

    let matched = false;
    navLinks.forEach(link => {
      // Extract link file name from href
      const href = link.getAttribute('href') || '';
      const hrefName = href.split('/').pop();

      if (hrefName === current) {
        link.classList.add('active');
        matched = true;
      } else {
        link.classList.remove('active');
      }

      // clicking a nav link should immediately show active style
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Fallback: if no match (e.g. index served as '/'), ensure first link becomes active
    if (!matched && navLinks.length) {
      // If URL is root '/', try to match 'index.html' href; otherwise set first
      const rootMatch = [...navLinks].find(l => (l.getAttribute('href') || '').split('/').pop() === 'index.html');
      if (rootMatch) rootMatch.classList.add('active');
      else navLinks[0].classList.add('active');
    }
  })();

  // 2) Fade-in sections on load for a nicer UI
  (function fadeInSections() {
    const sections = document.querySelectorAll('section, .resume, .biodata, .home-content');
    sections.forEach((sec, idx) => {
      // set initial styles
      sec.style.opacity = 0;
      sec.style.transform = 'translateY(10px)';
      sec.style.transition = 'opacity 600ms ease, transform 600ms ease';
      // staggered reveal
      setTimeout(() => {
        sec.style.opacity = 1;
        sec.style.transform = 'translateY(0)';
      }, 80 * idx + 150);
    });
  })();

  // 3) Ensure external links that should open in new tab do so (defensive)
  (function externalLinkTargets() {
    const anchors = document.querySelectorAll('a[href]');
    anchors.forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      // If link is clearly external and missing target, set target=_blank and rel for safety
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin && !a.target) {
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
        }
      } catch (e) {
        // ignore invalid urls (e.g., mailto:) — keep behavior as-is
      }
    });
  })();
});
