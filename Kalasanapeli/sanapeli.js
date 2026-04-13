// Kaikki 12 kalaa
const fishWords = [
  "ahven", "hauki", "kuha", "lohi", "siika", "särki",
  "made", "muikku", "silakka", "turska", "lahna", "säyne"
];

let score = 0;

let wordList = [...fishWords].sort(() => Math.random() - 0.5);
let wordIndex = 0;
let currentWord = "";

function shuffleWord(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const shuffled = letters.join("");
  return shuffled === word ? shuffleWord(word) : shuffled;
}

function newWord() {
  if (wordIndex >= wordList.length) {
    alert("Kaikki 12 sanaa käytetty! Peli päättyi.");
    return;
  }

  currentWord = wordList[wordIndex];
  wordIndex++;

  const scrambledDiv = document.getElementById("scrambled");
  scrambledDiv.textContent = shuffleWord(currentWord);

  scrambledDiv.style.animation = "none";
  void scrambledDiv.offsetWidth;
  scrambledDiv.style.animation = "pop 0.4s ease";

  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("guess").focus();
}

function checkAnswer() {
  const guess = document.getElementById("guess").value.trim().toLowerCase();
  const message = document.getElementById("message");

  if (!guess) {
    message.textContent = "Kirjoita jokin vastaus.";
    message.style.color = "yellow";
    return;
  }

  if (guess === currentWord.toLowerCase()) {
    score++;
    message.textContent = "Oikein! Se oli " + currentWord + ".";
    message.style.color = "yellow";

    document.getElementById("score").textContent = "Pisteet: " + score + " / 12";

    if (score >= 12) {
      alert("Onneksi olkoon! Sait 12 oikein ja läpäisit pelin!");
    }

  } else {
    message.textContent = "Väärin. Oikea vastaus oli: " + currentWord + ".";
    message.style.color = "red";
  }
}

document.getElementById("checkBtn").addEventListener("click", checkAnswer);
document.getElementById("nextBtn").addEventListener("click", newWord);

document.getElementById("guess").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

newWord();
