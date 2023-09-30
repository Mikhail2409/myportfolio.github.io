// Fonction "onClick" qui est appelée lorsque l'image est cliquée.
function onClick(element) {
  document.getElementById("img01").src = element.src; //Cette fonction met à jour la source de l'image dans la div avec l'id "img01" en utilisant la source de l'image cliquée,
  document.getElementById("modal01").style.display = "block"; //puis affiche la div avec l'id "modal01" en utilisant la propriété "display" avec la valeur "block".
  var captionText = document.getElementById("caption"); //Ensuite, le texte de la div avec l'id "caption" est mis à jour avec la valeur de l'attribut alt de l'image cliquée.
  captionText.innerHTML = element.alt;
}

// Bascule entre l'affichage et le masquage de la barre latérale lorsque vous cliquez sur l'icône de menu
var mySidebar = document.getElementById("mySidebar");
//Fonction JavaScript "sidebar_open()" est définie pour afficher ou masquer la barre de navigation lorsqu'on clique sur l'icône du menu.
//Cette fonction utilise la variable "mySidebar" qui est l'élément de la barre de navigation défini dans le code HTML.
function sidebar_open() {
  //La fonction "sidebar_open()" vérifie d'abord si la barre de navigation a déjà un style "display" égal à "block" (c'est-à-dire qu'elle est déjà affichée).
  if (mySidebar.style.display === "block") {
    mySidebar.style.display = "none"; //Si c'est le cas, elle change le style de la barre de navigation en "none" pour la masquer.
  } else {
    mySidebar.style.display = "block"; //Sinon, elle change le style de la barre de navigation en "block" pour l'afficher.
  }
}

// Fonction `sidebar_close` est appelée lorsque l'utilisateur clique sur l'un des balises `<a>` de la barre latérale
function sidebar_close() {
  mySidebar.style.display = "none"; //Elle masque la barre latérale en modifiant la propriété `display` de l'élément `mySidebar` en "none".
}

//Jeu au hasard
const cards = document.querySelectorAll(".card");
shuffleCards();
const messageElement = document.getElementById("message");

let flippedCards = [];

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 3) {
    return;
  }

  this.classList.add("flipped");

  flippedCards.push(this);

  if (flippedCards.length === 3) {
    const dataCardValues = flippedCards.map((card) =>
      card.getAttribute("data-card")
    );

    if (dataCardValues.includes("1")) {
      if (dataCardValues.filter((value) => value === "1").length === 3) {
        showMessage("Gagné!");
      } else if (dataCardValues.filter((value) => value === "1").length === 2) {
        showMessage("Gagné? Perdu!");
      } else {
        showMessage("Perdu? Perdu!");
      }
    } else {
      showMessage("Perdu");
    }

    resetCards();
  }
}

function resetCards() {
  setTimeout(() => {
    flippedCards.forEach((card) => {
      card.classList.remove("flipped");
    });
    flippedCards = [];
    shuffleCards();
  }, 5000);
}

function shuffleCards() {
  const game = document.querySelector(".memory-game");
  for (let i = game.children.length; i >= 0; i--) {
    game.appendChild(game.children[(Math.random() * i) | 0]);
  }
}

function showMessage(message) {
  messageElement.textContent = message;
  messageElement.classList.add("animate");
}

messageElement.addEventListener("animationend", () => {
  messageElement.classList.remove("animate");
});
