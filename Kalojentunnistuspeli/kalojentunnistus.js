const questions = [
    {
        image: '../Kalatunnistus_peli_kuvat/kala1.png',
        correct: 'Lohi',
        choices: ['Hauki', 'Ahven', 'Lohi', 'Särki', 'Muikku']
    },
    {
        image: '../Kalatunnistus_peli_kuvat/kala2.png',
        correct: 'Hauki',
        choices: ['Hauki', 'Ahven', 'Lohi', 'Särki', 'Muikku']
    },
    {
        image: '../Kalatunnistus_peli_kuvat/kala3.png',
        correct: 'Särki',
        choices: ['Hauki', 'Ahven', 'Lohi', 'Särki', 'Muikku']
    },
    {
        image: '../Kalatunnistus_peli_kuvat/kala4.png',
        correct: 'Ahven',
        choices: ['Hauki', 'Ahven', 'Lohi', 'Särki', 'Muikku']
    },
    {
        image: '../Kalatunnistus_peli_kuvat/kala5.png',
        correct: 'Muikku',
        choices: ['Hauki', 'Ahven', 'Lohi', 'Särki', 'Muikku']
    }
];

let index = 0;
let score = 0;
let answered = false;


const fishImage = document.getElementById('fish-image');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');
const buttons = document.querySelectorAll('.choice-btn');


function loadQuestion() {
    answered = false;
    feedback.textContent = '';
    nextBtn.style.display = 'none';
    scoreDisplay.textContent = '';

    const q = questions[index];
    fishImage.src = q.image;

    const shuffled = [...q.choices].sort(() => Math.random() - 0.5);
    
    buttons.forEach((btn, i) => {
        btn.textContent = shuffled[i];
        btn.style.backgroundColor = '';
        btn.disabled = false;
    
    
    });
}

function checkAnswer(selected) {
    if (answered) return;
    answered = true;

    const correct = questions[index].correct;

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = 'green';
        } else if (btn.textContent === selected) {
            btn.style.backgroundColor = 'red';
        }
    });

    if (selected === correct) {
        score++;
        feedback.textContent = 'Oikein!';
    } else {
        feedback.textContent = `Väärin! Oikea vastaus oli: ${correct}`;
    }

    nextBtn.style.display = 'inline-block';
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => checkAnswer(btn.textContent));
});
nextBtn.addEventListener('click', () => {
    index++;
    if (index < questions.length) {
        loadQuestion();
    } else {
        fishImage.style.display = 'none';
        document.getElementById('choices').style.display = 'none';
        feedback.textContent = '';
        nextBtn.style.display = 'none';
        scoreDisplay.textContent = `Peli ohi! Pisteet: ${score} / ${questions.length}`;

        document.getElementById('end-buttons').style.display = 'flex';
    }
});

loadQuestion();


document.getElementById('play-again-btn').addEventListener('click', () => {
    index = 0;
    score = 0;
    answered = false;
    fishImage.style.display = 'block';
    document.getElementById('choices').style.display = 'flex';
    document.getElementById('end-buttons').style.display = 'none';
    scoreDisplay.textContent = '';
    loadQuestion();
});

document.getElementById('main-menu-btn').addEventListener('click', () => {
    window.location.href = '../index.html';
});

