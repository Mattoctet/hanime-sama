// FICHIER : js/dispani.js
console.log("// FICHIER : js/dispani.js");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  if (!code) {
    console.error("Aucun code fourni dans l'URL");
    document.getElementById("fiche").innerHTML = "<p>Code manquant.</p>";
    return;
  }

  const jsonPath = `/data/anime/${code}.jsn`;

  fetch(jsonPath)
    .then(res => {
      if (!res.ok) throw new Error(`Fichier JSON introuvable : ${jsonPath}`);
      return res.json();
    })
    .then(data => {
      // Ajout saison à chaque épisode pour navigation
      data.saisons.forEach(saison => {
        saison.episodes.forEach(ep => ep.saison = saison.saison);
      });

      afficherOeuvre(data);
      afficherEpisodes(data.saisons);
      afficherLecteur(data.saisons[0].episodes[0]);
      mettreAJourNavigation(data.saisons, 0, 0);
    })
    .catch(err => {
      console.error("Erreur chargement JSON anime:", err);
      document.getElementById("fiche").innerHTML = "<p>Erreur chargement fiche anime.</p>";
    });
});

function afficherOeuvre(data) {
  const fiche = document.getElementById("fiche");
  fiche.innerHTML = `
    <div class="fiche-container">
      <div class="fiche-cover">
        <img src="${data.cover}" alt="${data.titre}" />
      </div>
      <div class="fiche-texte">
        <h1>${data.titre}</h1>
        <p>${data.desc}</p>
        <p>Genres : ${data.genre.join(", ")}</p>
      </div>
    </div>
  `;
}

function afficherEpisodes(saisons) {
  const menu = document.getElementById("menu-episodes");
  menu.innerHTML = "";
  saisons.forEach((saison, sIdx) => {
    const details = document.createElement("details");
    if (sIdx === 0) details.open = true;

    const summary = document.createElement("summary");
    summary.textContent = `Saison ${saison.saison}`;
    details.appendChild(summary);

    const epList = document.createElement("ul");
    epList.className = "episode-list";

    saison.episodes.forEach((ep, eIdx) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = `Épisode ${ep.ep} - ${ep.titre}`;
      btn.onclick = () => {
        afficherLecteur(ep);
        mettreAJourNavigation(saisons, sIdx, eIdx);
      };
      li.appendChild(btn);
      epList.appendChild(li);
    });

    details.appendChild(epList);
    menu.appendChild(details);
  });
}

function afficherLecteur(episode) {
  const lecteur = document.getElementById("lecteur");
  if (!episode.lien) {
    lecteur.innerHTML = `<p>Contenu non disponible pour cet épisode.</p>`;
    return;
  }
  if (episode.lien.endsWith(".mp4")) {
    lecteur.innerHTML = `
      <video class="video-lecteur" controls src="${episode.lien}"></video>
    `;
  } else {
    lecteur.innerHTML = `
      <iframe class="iframe-lecteur" src="${episode.lien}" frameborder="0" allowfullscreen></iframe>
    `;
  }
}

function mettreAJourNavigation(saisons, sIdx, eIdx) {
  const nav = document.getElementById("navig");
  nav.innerHTML = "";

  // Bouton Précédent
  const btnPrev = document.createElement("button");
  btnPrev.title = "Épisode précédent";
  btnPrev.innerHTML = `<img src="/img/arrow-left.png" alt="Précédent" />`;
  if (sIdx === 0 && eIdx === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.onclick = () => {
      let ns = sIdx;
      let ne = eIdx - 1;
      if (ne < 0) {
        ns--;
        ne = saisons[ns].episodes.length - 1;
      }
      const ep = saisons[ns].episodes[ne];
      afficherLecteur(ep);
      mettreAJourNavigation(saisons, ns, ne);
    };
  }
  nav.appendChild(btnPrev);

  // Bouton Suivant
  const btnNext = document.createElement("button");
  btnNext.title = "Épisode suivant";
  btnNext.innerHTML = `<img src="/img/arrow-right.png" alt="Suivant" />`;
  if (sIdx === saisons.length - 1 && eIdx === saisons[sIdx].episodes.length - 1) {
    btnNext.disabled = true;
  } else {
    btnNext.onclick = () => {
      let ns = sIdx;
      let ne = eIdx + 1;
      if (ne >= saisons[ns].episodes.length) {
        ns++;
        ne = 0;
      }
      const ep = saisons[ns].episodes[ne];
      afficherLecteur(ep);
      mettreAJourNavigation(saisons, ns, ne);
    };
  }
  nav.appendChild(btnNext);
}
