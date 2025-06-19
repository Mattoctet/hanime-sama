// FICHIER : js/lectimg.js

function loadImageLecteur(data, episode = "ep1") {
  if (!data || !data.episodes) {
    console.error("Données invalides pour lecteur image");
    return;
  }

  const container = document.getElementById("lecteur-imgs");
  if (!container) {
    console.error("Conteneur lecteur image introuvable");
    return;
  }

  container.innerHTML = ""; // vide le container

  // Cherche l'array d'URLs pour l'épisode donné
  const epData = data.episodes.find(e => e.hasOwnProperty(episode));
  if (!epData) {
    console.error("Épisode non trouvé :", episode);
    return;
  }

  const liens = epData[episode];
  liens.forEach(obj => {
    Object.values(obj).forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = "Page de manga";
      img.style.width = "100%";
      img.style.marginBottom = "10px";
      container.appendChild(img);
    });
  });
}

// Exemple d'appel :
// fetch('data.json').then(r => r.json()).then(data => loadImageLecteur(data, "ep1"));
