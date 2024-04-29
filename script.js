let compteCredits = parseInt(localStorage.getItem('compteCredits')) || 0;
let intervalleAutoExplore = null;
let intervalleAutoSonde = null;
let intervalleAutoTelescope = null;
let navetteLevel = 1;
let sondeLevel = 1;
let telescopeLevel = 1;

const elementCompteCredits = document.getElementById('compteCredits');
elementCompteCredits.textContent = compteCredits;

const explorerButton = document.getElementById('explorer');
explorerButton.addEventListener('click', () => {
  compteCredits += Math.floor(Math.random() * 10) + 1;
  mettreAJourCompteCredits();
});

const acheterNavetteButton = document.getElementById('acheterNavette');
mettreAJourPrixAchat(acheterNavetteButton, "navette");

acheterNavetteButton.addEventListener('click', () => {
  const prixNavette = Math.ceil(10 * Math.pow(1.3, navetteLevel)); // Prix augmenté de 30% à chaque achat
  if (compteCredits >= prixNavette) {
    compteCredits -= prixNavette;
    navetteLevel++;
    mettreAJourCompteCredits();
    activerPouvoirNavette();
    alert(`Vous avez acheté une Navette Spatiale de niveau ${navetteLevel} !`);
    if (!intervalleAutoExplore) {
      intervalleAutoExplore = setInterval(autoExplore, 500); // Exploration automatique toutes les 0.5 seconde
    }
  } else {
    alert(`Pas assez de crédits ! Prix: ${prixNavette} crédits`);
  }
  mettreAJourIconeAchat("navette");
  mettreAJourPrixAchat(acheterNavetteButton, "navette");
});

const acheterSondeButton = document.getElementById('acheterSonde');
mettreAJourPrixAchat(acheterSondeButton, "sonde");

acheterSondeButton.addEventListener('click', () => {
  const prixSonde = Math.ceil(100 * Math.pow(1.3, sondeLevel)); // Prix augmenté de 30% à chaque achat
  if (compteCredits >= prixSonde) {
    compteCredits -= prixSonde;
    sondeLevel++;
    mettreAJourCompteCredits();
    activerPouvoirSonde();
    alert(`Vous avez acheté une Sonde Spatiale de niveau ${sondeLevel} !`);
    if (!intervalleAutoSonde) {
      intervalleAutoSonde = setInterval(autoSonde, 2000); // Exploration automatique toutes les 2 secondes
    }
  } else {
    alert(`Pas assez de crédits ! Prix: ${prixSonde} crédits`);
  }
  mettreAJourIconeAchat("sonde");
  mettreAJourPrixAchat(acheterSondeButton, "sonde");
});

const acheterTelescopeButton = document.getElementById('acheterTelescope');
mettreAJourPrixAchat(acheterTelescopeButton, "telescope");

acheterTelescopeButton.addEventListener('click', () => {
  const prixTelescope = Math.ceil(1000 * Math.pow(1.3, telescopeLevel)); // Prix augmenté de 30% à chaque achat
  if (compteCredits >= prixTelescope) {
    compteCredits -= prixTelescope;
    telescopeLevel++;
    mettreAJourCompteCredits();
    activerPouvoirTelescope();
    alert(`Vous avez acheté un Télescope Spatial de niveau ${telescopeLevel} !`);
    if (!intervalleAutoTelescope) {
      intervalleAutoTelescope = setInterval(autoTelescope, 1000); // Exploration automatique toutes les 1 seconde
    }
  } else {
    alert(`Pas assez de crédits ! Prix: ${prixTelescope} crédits`);
  }
  mettreAJourIconeAchat("telescope");
  mettreAJourPrixAchat(acheterTelescopeButton, "telescope");
});

function autoExplore() {
  const gain = navetteLevel * (Math.floor(Math.random() * 10) + 1); // Gain augmenté avec le niveau de la navette
  compteCredits += gain;
  mettreAJourCompteCredits();
}

function autoSonde() {
  const gain = sondeLevel * 2; // Gain augmenté avec le niveau de la sonde
  compteCredits += gain;
  mettreAJourCompteCredits();
}

function autoTelescope() {
  const gain = telescopeLevel * (Math.floor(Math.random() * 14) + 2); // Gain augmenté avec le niveau du télescope
  compteCredits += gain;
  mettreAJourCompteCredits();
}

function mettreAJourCompteCredits() {
  elementCompteCredits.textContent = compteCredits;
  localStorage.setItem('compteCredits', compteCredits);
}

function activerPouvoirNavette() {
  alert('La Navette Spatiale vous permet de cliquer plus rapidement dans l\'espace !');
}

function activerPouvoirSonde() {
  alert('La Sonde Spatiale explore automatiquement l\'espace et collecte des données pour vous !');
}

function activerPouvoirTelescope() {
  alert('Le Télescope Spatial trouve des objets spéciaux dans l\'espace, vous permettant de collecter plus de crédits !');
}

function mettreAJourIconeAchat(type) {
  const button = document.getElementById(`acheter${type.charAt(0).toUpperCase() + type.slice(1)}Button`);
  button.classList.remove("level1", "level2", "level3", "level4", "level5");
  button.classList.add(`level${eval(`${type}Level`)}`);
}

function mettreAJourPrixAchat(button, type) {
  const prix = Math.ceil(eval(`${type}Level === 1 ? ${type}Level * 10 : ${type}Level * 10 * Math.pow(1.3, ${type}Level - 1)`));
  button.textContent = `Acheter une ${type.charAt(0).toUpperCase() + type.slice(1)} (${prix} Crédits)`;
}
