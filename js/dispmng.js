// FICHIER : js/dispmng.js
console.log("// FICHIER : js/dispmng.js");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) {
    console.error("Aucun code fourni dans l'URL");
    document.getElementById("fiche").innerHTML = "<p>Code manquant.</p>";
    return;
  }

  const jsonPath = `/data/manga/${code}.jsn`;

  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error(`Fichier JSON introuvable : ${jsonPath}`);
      return res.json();
    })
    .then(data => {
      afficherOeuvre(data);
      afficherEpisodes(data.saisons);
      afficherLecteur(data.saisons[0].episodes[0]);
      afficherNavigation();
    })
    .catch(err => {
      console.error("Erreur chargement JSON manga:", err);
      document.getElementById("fiche").innerHTML = "<p>Erreur chargement fiche manga.</p>";
    });
});

function afficherOeuvre(data) {
  const fiche = document.getElementById("fiche");
  fiche.innerHTML = `
    <h1>${data.titre}</h1>
    <img src="${data.cover}" alt="${data.titre}" class="fiche-cover" />
    <p>${data.desc}</p>
    <p>Genres : ${data.genre.join(", ")}</p>
  `;
}

function afficherEpisodes(saisons) {
  const menu = document.getElementById("menu-episodes");
  menu.innerHTML = "";
  saisons.forEach(saison => {
    const saisonDiv = document.createElement("div");
    saisonDiv.innerHTML = `<h2>Saison ${saison.saison}</h2>`;
    saison.episodes.forEach(ep => {
      const epBtn = document.createElement("button");
      epBtn.textContent = `Épisode ${ep.ep} - ${ep.titre}`;
      epBtn.onclick = () => afficherLecteur(ep);
      saisonDiv.appendChild(epBtn);
    });
    menu.appendChild(saisonDiv);
  });
}

function afficherLecteur(episode) {
  const lecteur = document.getElementById("lecteur");
  if (!episode.lien) {
    lecteur.innerHTML = `<p>Contenu non disponible pour cet épisode.</p>`;
    return;
  }
  if (episode.lien.endsWith(".mp4")) {
    lecteur.innerHTML = `<video controls src="${episode.lien}"></video>`;
  } else {
    lecteur.innerHTML = `<iframe src="${episode.lien}" frameborder="0" allowfullscreen></iframe>`;
  }
}

function afficherNavigation() {
  const nav = document.getElementById("navig");
  nav.innerHTML = `<button onclick="history.back()">Retour</button>`;
}
