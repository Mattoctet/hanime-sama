// FICHIER : js/homepage.js
console.log('// FICHIER : js/homepage.js');

document.addEventListener("DOMContentLoaded", () => {
  // Chargement des récents
  fetch("/data/recent.jsn")
    .then(res => res.json())
    .then(data => {
      populateSection("recent", data);
    })
    .catch(err => console.error("Erreur chargement recent.jsn :", err));

  // Chargement des populaires
  fetch("/data/popular.jsn")
    .then(res => res.json())
    .then(data => {
      populateSection("popular", data);
    })
    .catch(err => console.error("Erreur chargement popular.jsn :", err));
});

function populateSection(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "episode-card";
    card.style.cursor = "pointer";

    // Choix du chemin en fonction du type
    let basePath;
    switch (item.type) {
      case "anime": basePath = "anime/code/codeani.htm?code="; break;
      case "manga": basePath = "manga/code/codemng.htm?code="; break;
      case "manwha": basePath = "manwha/code/codemnw.htm?code="; break;
      default: basePath = "#"; // type inconnu
    }

    card.onclick = () => {
      if (basePath !== "#") {
        location.href = basePath + encodeURIComponent(item.code);
      } else {
        alert("Type inconnu pour " + item.titre);
      }
    };

    card.innerHTML = `
      <img src="${item.cover}" alt="${item.titre}">
      <h3>${item.titre}</h3>
    `;
    container.appendChild(card);
  });
}
