var kalat = [
    { nimi: "Hauki", elinymparisto: "Ruovikkoinen lahti" },
    { nimi: "Taimen", elinymparisto: "Virtaava joki" },
    { nimi: "Silakka", elinymparisto: "Itameren avovesi" },
    { nimi: "Made", elinymparisto: "Syva jarvi" }
];

var elinymparistot = [
    "Ruovikkoinen lahti",
    "Virtaava joki",
    "Itameren avovesi",
    "Syva jarvi"
];

var kalatDiv = document.getElementById("kalat");
var elinymparistotDiv = document.getElementById("elinymparistot");
var tila = document.getElementById("tila");
var pisteetSpan = document.getElementById("pisteet");
var alustaNappi = document.getElementById("alusta");

var valittuKala = null;
var pisteet = 0;
var loydetyt = [];

function piirra() {
    kalatDiv.innerHTML = "";
    elinymparistotDiv.innerHTML = "";

    for (var i = 0; i < kalat.length; i++) {
        var kala = kalat[i];
        var nappi = document.createElement("button");
        nappi.textContent = kala.nimi;

        if (valittuKala === kala.nimi) {
            nappi.classList.add("valittu");
        }

        if (loydetyt.includes(kala.nimi)) {
            nappi.classList.add("oikein");
            nappi.disabled = true;
        }

        nappi.addEventListener("click", function () {
            var nimi = this.textContent;
            valittuKala = nimi;
            tila.textContent = "Valitsit kalan " + nimi;
            pisteetSpan.textContent = pisteet;
            piirra();
        });

        kalatDiv.appendChild(nappi);
    }

    for (var j = 0; j < elinymparistot.length; j++) {
        var paikka = elinymparistot[j];
        var nappi = document.createElement("button");
        nappi.textContent = paikka;

        nappi.addEventListener("click", function () {
            if (!valittuKala) {
                tila.textContent = "Valitse ensin kala.";
                return;
            }

            var kala = null;

            for (var k = 0; k < kalat.length; k++) {
                if (kalat[k].nimi === valittuKala) {
                    kala = kalat[k];
                }
            }

            if (kala && kala.elinymparisto === this.textContent) {
                pisteet++;
                loydetyt.push(kala.nimi);
                tila.textContent = "Oikein!";
                valittuKala = null;
            } else {
                tila.textContent = "Vaarin, yrita uudelleen.";
            }

            pisteetSpan.textContent = pisteet;

            if (pisteet === kalat.length) {
                tila.textContent = "Hienoa, sait kaikki oikein!";
            }

            piirra();
        });

        elinymparistotDiv.appendChild(nappi);
    }
}

alustaNappi.addEventListener("click", function () {
    valittuKala = null;
    pisteet = 0;
    loydetyt = [];
    tila.textContent = "Valitse ensin kala.";
    pisteetSpan.textContent = "0";
    piirra();
});

piirra();
