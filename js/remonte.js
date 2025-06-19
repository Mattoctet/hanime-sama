// FICHIER : js/remonte.js
console.log('// FICHIER : js/remonte.js');

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector('.btn-remonter');
  const header = document.querySelector('header');

  // Cacher par défaut
  btn.style.display = 'none';

  if (!header || !btn) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      btn.style.display = entry.isIntersecting ? 'none' : 'block';
    },
    {
      root: null, // viewport
      threshold: 0 // dès qu'une portion du header disparaît
    }
  );

  observer.observe(header);

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
