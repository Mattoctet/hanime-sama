// FICHIER : js/loadcss.js
console.log('// FICHIER : js/loadcss.js');
(function() {
  const dossier = window.innerWidth <= 768 ? 'tel' : 'ordi';
  ['header.css', 'style.css', 'media.css'].forEach(nom => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/css/${dossier}/${nom}`; // CHEMIN ABSOLU
    document.head.appendChild(link);
  });
})();
