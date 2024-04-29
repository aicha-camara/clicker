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
