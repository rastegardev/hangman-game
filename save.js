const secretPharases = [
  "never",
  "you",
  "dad",
  "ball",
  "phone",
  "dog",
  "cat",
  "bird",
  "train",
  "plane",
  "car",
  "bus",
  "city",
  "hotel",
  "farm",
  "room",
  "hat",
  "dress",
  "suit",
  "red",
  "green",
  "gray",
  "baby",
  "king",
  "queen",
  "actor",
  "oil",
];

//* -----

// in moteghayer ha ro be sorate Global tarif mikonim

// entekhabe kalame ramdom iz bein arraye
let randomItem = "";

// har bar ke user click mikone on harf ro push mikonim to in moteghayer, agar on harf dakhel arraye bashe
// baraye inke bebinim user che harf haye ro hads zade
let clicked = [];

// neshon dadne (_) ha va harf ha
let result = "";

// 6 bar user mitone eshtebah hads bezane
let mistakes = 0;

//* -----

// Choose a random word from the array
function selectRandomItem() {
  randomItem =
    secretPharases[Math.floor(Math.random() * secretPharases.length)];
  console.log(randomItem);

  document.getElementById("letters").addEventListener("click", buttonHandeler);
  window.addEventListener("keydown", keyHandelr);
}

//* -----

// vorodi in function => (letter) - harfi hast ke user vared karde
// in function barasi mikone harfi ke user vared karde toye arraye hast ya na
function letterHandeler(letter) {
  letter = letter.toLowerCase();
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
  document.getElementById(letter.toUpperCase()).className = "used";

  // if => on harfi ke user entekhab karde dakhel randomItem bashe index sh bogorg tar mosavi 0 hast
  // ke yani toye randomItem oh harf vojod dare
  // else if => harfi ke user entekhab karde toye randomItem nabashe
  if (randomItem.indexOf(letter) >= 0) {
    setUnderScors();
    checkIfWon();
  } else if (randomItem.indexOf(letter) === -1) {
    // har bar ke user eshtebah mizane ye adad be mistakes ezafe mishe
    mistakes++;
    checkIFLost();
    updateGameImage();
  }
}

// baraye zamani hast ke roye button ha click mishe
function buttonHandeler(event) {
  // console.log(event.target.id);
  letterHandeler(event.target.id);
}

// baraye ine ke ba key haye keyboard ham beshe click kard
function keyHandelr(event) {
  letterHandeler(event.key);
}

//* -----

function setUnderScors() {
  let splitedWord = randomItem.split("");
  // console.log(splitedWord);

  // map loop => agar harf entekhabi user dar randomItem bashe neshon mide agar nabashe (_) neshon mide
  let loopWord = splitedWord.map((letter) =>
    clicked.indexOf(letter) >= 0 ? letter : "_"
  );
  // console.log(loopWord);

  // join("") item haye dakhel arraye ro be ham toye resghte michasbone
  result = loopWord.join("");
  document.getElementById("clue").innerHTML = `<p>${result}</p>`;
}

//* -----

// agar user tamame harf haro dorost hads bezane in function ijra mishe
function checkIfWon() {
  if (randomItem === result) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document.querySelector(".game-img").src = "assets/images/winner.png";
  }
}

//* -----

// agar user tamame harf haro eshtebh vared kone in function ijra mishe
function checkIFLost() {
  if (mistakes === 6) {
    document.getElementById("gameover").querySelector("p").style.display =
      "block";
    document
      .getElementById("gameover")
      .querySelector("p").style.backgroundColor = "red";

    document.getElementById(
      "clue"
    ).innerHTML = `<p>answer is: ${randomItem}</p>`;
  }
}

//* -----

// ba har entekhabe eshtebah user axe bazi avaz mishe
function updateGameImage() {
  const gameImage = document.querySelector(".game-img");
  gameImage.src = `assets/images/hangman${mistakes}.png`;
  if (mistakes > 6) {
    gameImage.src = "assets/images/hangman0.png";
  }
}

//* -----

// reload page for game over button
document.getElementById("gameover").addEventListener("click", function () {
  location.reload();
});

//* -----

selectRandomItem();
setUnderScors();
