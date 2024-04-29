// Récupérer les éléments du DOM
const elementCompteDollars = document.getElementById('compteDollars');
const boutonClic = document.getElementById('boutonClic');
const boutonAchatAutoClick5s = document.getElementById('boutonAchatAutoClick5s');
const boutonAchatAutoClick2s = document.getElementById('boutonAchatAutoClick2s');
const boutonReset = document.getElementById('boutonReset');
const autoClickerImg = document.getElementById('autoClickerImg');
const boutonBaisserTemps = document.getElementById('boutonBaisserTemps');
const elementNombreAutoClick = document.getElementById('nombreAutoClick');
const intervalleAutoClick = document.getElementById('intervalleAutoClick');
const boutonAmeliorerClick = document.getElementById('boutonameliorerclick');
const boutonMultiplicateurTemporaire = document.getElementById('boutonMultiplicateurTemporaire');
const multiplicateurAutoClick = document.getElementById('multiplicateurAutoClick');
const boutonAchatEauGelee = document.querySelector('#achat_objectif .ressource:nth-child(1) .icone-ressource');
const boutonAchatRocheLunaire = document.querySelector('#achat_objectif .ressource:nth-child(2) .icone-ressource');
const boutonAchatRegolithe = document.querySelector('#achat_objectif .ressource:nth-child(3) .icone-ressource');

// Définir les variables
let compteDollars = parseInt(localStorage.getItem('compteDollars')) || 0;
let nombreAutoClickAchetes = parseInt(localStorage.getItem('nombreAutoClickAchetes')) || 0;
let prixInitialAutoClick = 10;
let prixSupplementaireParClick = 5;
let intervalleActuel = 10;
let prixProgressif = 20; // Prix initial
let incrementPrixProgressif = 10; // Montant d'augmentation du prix à chaque achat
let intervallesAutoClick = []; // Utilisez un autre nom pour le tableau
let augmentationDollarsParClickAuto = 1;
let prixInitialMultiplicateurTemporaire = 100;
let incrementPrixMultiplicateurTemporaire = 50;

// Mettre à jour l'affichage du nombre de clics automatiques et de l'intervalle entre les clics automatiques
function mettreAJourAffichage() {
  elementNombreAutoClick.textContent = nombreAutoClickAchetes;
  intervalleAutoClick.textContent = intervalleActuel;
}
// Fonction pour acheter un clic automatique
function acheterAutoClick(interval) {
  let prixAchat = prixInitialAutoClick + (nombreAutoClickAchetes * prixSupplementaireParClick);
  if (compteDollars >= prixAchat) {
    compteDollars -= prixAchat;
    nombreAutoClickAchetes++;
    mettreAJourCompteDollars();
    mettreAJourAffichage();
    alert(`Vous avez acheté un clic automatique (Toutes les ${interval} secondes) !`);
    if (!intervallesAutoClick[interval]) {
      intervallesAutoClick[interval] = setInterval(() => autoClick(), interval * 1000);
      acheterAutoClicker();
    }
  } else {
    alert('Pas assez de dollars ou clic automatique déjà acheté !');
  }
}
// Fonction pour baisser le temps entre les clics automatiques et payer pour cela
function baisserTemps() {
  let prixBaisseTemps = prixProgressif;
  if (nombreAutoClickAchetes > 0) {
    if (compteDollars >= prixBaisseTemps) {
      if (confirm(`Êtes-vous sûr de vouloir acheter une baisse de temps pour ${prixBaisseTemps} dollars ?`)) {
        intervalleActuel--;
        const nouveauIntervallesAutoClick = {};
        for (const interval in intervallesAutoClick) {
          if (intervallesAutoClick.hasOwnProperty(interval)) {
            clearInterval(intervallesAutoClick[interval]);
            intervallesAutoClick[interval] = setInterval(() => autoClick(), intervalleActuel * 1000);
            nouveauIntervallesAutoClick[interval] = intervallesAutoClick[interval];
          }
        }
        intervallesAutoClick = nouveauIntervallesAutoClick;
        alert(`Vous avez diminué le temps des clics automatiques à ${intervalleActuel} secondes !`);
        compteDollars -= prixBaisseTemps;
        prixProgressif += incrementPrixProgressif;
        mettreAJourCompteDollars();
        mettreAJourAffichage();
      }
    } else {
      alert(`Vous n'avez pas assez d'argent pour acheter la baisse de temps, il vous faut ${prixBaisseTemps}$ !`);
    }
  } else {
    alert('Aucun clic automatique à baisser !');
  }
}
// Fonction pour le clic automatique amélioré
function autoClickAmeliorer() {
  augmentationDollarsParClickAuto++;
  alert(`Vous avez amélioré le montant de dollars gagnés par clic automatique à x${augmentationDollarsParClickAuto} !`);
  mettreAJourCompteDollars();
}
// Fonction pour activer temporairement le multiplicateur x10
function activerMultiplicateurTemporaire() {
  augmentationDollarsParClickAuto *= 10;
  multiplicateurAutoClick.textContent = `x${augmentationDollarsParClickAuto}`;
}

// Fonction pour désactiver le multiplicateur temporaire x10
function desactiverMultiplicateurTemporaire() {
  augmentationDollarsParClickAuto /= 10;
  multiplicateurAutoClick.textContent = `x${augmentationDollarsParClickAuto}`;
}
// Fonction pour le clic automatique
function autoClick() {
  compteDollars += nombreAutoClickAchetes * augmentationDollarsParClickAuto;
  mettreAJourCompteDollars();
}
// Fonction pour mettre à jour l'affichage du compte de dollars
function mettreAJourCompteDollars() {
  elementCompteDollars.textContent = compteDollars;
  localStorage.setItem('compteDollars', compteDollars);
  localStorage.setItem('nombreAutoClickAchetes', nombreAutoClickAchetes);
}
// Fonction pour afficher l'image de l'auto clicker
function acheterAutoClicker() {
  autoClickerImg.style.display = 'block';
}
// Fonction pour acheter le multiplicateur temporaire x10
function acheterMultiplicateurTemporaire() {
  if (compteDollars >= prixInitialMultiplicateurTemporaire) {
    if (confirm(`Voulez-vous activer temporairement le multiplicateur x10 pour ${prixInitialMultiplicateurTemporaire} dollars ?`)) {
      compteDollars -= prixInitialMultiplicateurTemporaire;
      activerMultiplicateurTemporaire();
      setTimeout(desactiverMultiplicateurTemporaire, 60000);
      prixInitialMultiplicateurTemporaire += incrementPrixMultiplicateurTemporaire;
      mettreAJourCompteDollars();
    }
  } else {
    alert("Vous n'avez pas assez d'argent pour activer temporairement le multiplicateur x10 !");
  }
}
// Fonction pour acheter de l'eau gelée
function acheterEauGelee() {
  const prixEauGelee = 500; // Prix de l'eau gelée
  const mineraisDisponibles = parseInt(localStorage.getItem('minerais')) || 0; // Nombre de minerais disponibles

  if (mineraisDisponibles >= prixEauGelee) {
    localStorage.setItem('minerais', mineraisDisponibles - prixEauGelee);
    mettreAJourAffichage();
    alert('Achat d\'eau gelée effectué avec succès !');
  } else {
    alert('Vous n\'avez pas assez de minerais pour acheter de l\'eau gelée !');
  }
}


function acheterRocheLunaire() {
  const prixRocheLunaire = 20000; // Prix de la roche lunaire
  const mineraisDisponibles = parseInt(localStorage.getItem('minerais')) || 0; // Nombre de minerais disponibles

  if (mineraisDisponibles >= prixRocheLunaire) {
      if (confirm(`Voulez-vous acheter de la roche lunaire pour ${prixRocheLunaire} minerais ?`)) {
          // Réduire le nombre de minerais
          localStorage.setItem('minerais', mineraisDisponibles - prixRocheLunaire);

          // Mettre à jour l'affichage
          mettreAJourAffichage();
          alert('Achat effectué avec succès !');
      }
  } else {
      alert('Vous n\'avez pas assez de minerais pour acheter de la roche lunaire !');
  }
}

function acheterRegolithe() {
  const prixRegolithe = 100000; // Prix du régolithe
  const mineraisDisponibles = parseInt(localStorage.getItem('minerais')) || 0; // Nombre de minerais disponibles

  if (mineraisDisponibles >= prixRegolithe) {
      if (confirm(`Voulez-vous acheter du régolithe pour ${prixRegolithe} minerais ?`)) {
          // Réduire le nombre de minerais
          localStorage.setItem('minerais', mineraisDisponibles - prixRegolithe);

          // Mettre à jour l'affichage
          mettreAJourAffichage();
          alert('Achat effectué avec succès !');
      }
  } else {
      alert('Vous n\'avez pas assez de minerais pour acheter du régolithe !');
  }
}
