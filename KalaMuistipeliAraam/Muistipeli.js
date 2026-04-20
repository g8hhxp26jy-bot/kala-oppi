const IMAGES = [
    'ahven.png',
    'hauki.png',
    'lohikuva.png',
    'made.png',
    'muikku.png',
    'siika.png',
    'silakka.png',
    'särki.png'
];

let firstCard = null;
let secondCard = null;
let locked = false;
let moves = 0;
let pairsFound = 0;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function buildBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    firstCard = null;
    secondCard = null;
    locked = false;
    moves = 0;
    pairsFound = 0;
    document.getElementById('moves').textContent = 0;
    document.getElementById('pairs').textContent = 0;
    document.getElementById('win-msg').classList.add('hidden');

    const cards = shuffle([...IMAGES, ...IMAGES]);

    cards.forEach(image => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${image}" alt="${image}"></div>
            </div>`;
        card.dataset.image = image;
        card.addEventListener('click', onCardClick);
        board.appendChild(card);
    });
}

function onCardClick() {
    if (locked || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    locked = true;
    moves++;
    document.getElementById('moves').textContent = moves;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        pairsFound++;
        document.getElementById('pairs').textContent = pairsFound;
        reset();
        if (pairsFound === IMAGES.length) {
            document.getElementById('win-msg').classList.remove('hidden');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            reset();
        }, 900);
    }
}

function reset() {
    firstCard = null;
    secondCard = null;
    locked = false;
}

document.getElementById('restart-btn').addEventListener('click', buildBoard);

buildBoard();
