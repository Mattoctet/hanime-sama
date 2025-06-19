// FICHIER : /js/indexani.js
fetch("../data/anime.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("liste");
    data.forEach(entry => {
      const div = document.createElement("div");
      div.className = "fiche";

      div.innerHTML = `
        <a href="../code/codeani.htm?code=${entry.code}">
          <img src="../${entry.cover}" alt="cover">
          <h3>${entry.titre}</h3>
        </a>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Erreur lors du chargement de la liste anime :", err);
    document.getElementById("liste").innerHTML = "<p>Erreur de chargement des données.</p>";
  });
