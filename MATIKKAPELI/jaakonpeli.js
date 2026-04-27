var fishEmojis = ["🐟", "🐠", "🐡", "🦈", "🐙", "🦑", "🦐", "🦞", "🦀", "🐚"];

var levels = [
  { groups: 2, maxPerGroup: 3 },
  { groups: 2, maxPerGroup: 4 },
  { groups: 2, maxPerGroup: 5 },
  { groups: 3, maxPerGroup: 4 },
  { groups: 3, maxPerGroup: 5 },
  { groups: 3, maxPerGroup: 6 },
  { groups: 4, maxPerGroup: 5 },
  { groups: 4, maxPerGroup: 6 },
  { groups: 4, maxPerGroup: 7 },
  { groups: 5, maxPerGroup: 7 }
];

var currentLevel = 0;
var correctAnswer = 0;
var tries = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildLevel() {
  var config = levels[currentLevel];
  var groups = [];
  correctAnswer = 0;

  for (var i = 0; i < config.groups; i++) {
    var count = randomInt(1, config.maxPerGroup);
    var fish = fishEmojis[randomInt(0, fishEmojis.length - 1)];
    groups.push({ count: count, fish: fish });
    correctAnswer += count;
  }

  var area = document.getElementById("fishArea");
  area.innerHTML = "";

  for (var j = 0; j < groups.length; j++) {
    if (j > 0) {
      area.innerHTML += " <b>+</b> ";
    }
    for (var k = 0; k < groups[j].count; k++) {
      area.innerHTML += groups[j].fish;
    }
  }

  document.getElementById("levelText").textContent = "Taso " + (currentLevel + 1) + " / 10";
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("feedback").style.color = "#a8c890";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("triesInfo").textContent = "";
  document.getElementById("winScreen").style.display = "none";
  tries = 0;

  document.getElementById("answerInput").focus();
}

function checkAnswer() {
  var input = document.getElementById("answerInput");
  var val = parseInt(input.value);

  if (isNaN(val)) {
    document.getElementById("feedback").textContent = "Kirjoita luku!";
    document.getElementById("feedback").style.color = "#ff8080";
    return;
  }

  if (val === correctAnswer) {
    document.getElementById("feedback").textContent = "✔ Oikein! Vastaus oli " + correctAnswer;
    document.getElementById("feedback").style.color = "#6edd6e";
    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("triesInfo").textContent = "";
  } else {
    tries++;
    document.getElementById("feedback").textContent = "✘ Väärin! Yritä uudelleen.";
    document.getElementById("feedback").style.color = "#ff8080";
    document.getElementById("triesInfo").textContent = "Yritys nro " + tries;
    input.value = "";
    input.focus();
  }
}

function nextLevel() {
  currentLevel++;

  if (currentLevel >= levels.length) {
    document.getElementById("fishArea").innerHTML = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("answerInput").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.querySelectorAll("button")[0].style.display = "none";
    document.getElementById("winScreen").style.display = "block";
  } else {
    buildLevel();
  }
}

function restartGame() {
  currentLevel = 0;
  document.getElementById("answerInput").style.display = "inline-block";
  document.querySelectorAll("button")[0].style.display = "inline-block";
  buildLevel();
}

document.getElementById("answerInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkAnswer();
  }
});

buildLevel();