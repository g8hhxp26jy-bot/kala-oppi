const questions = ['Kysymys 1', 'Kysymys 2', 'Kysymys 3', 'Kysymys 4', 'Kysymys 5'];
const answers = ['a', 'b', 'c', 'd', 'e'];
let index = 0;

const images = document.getElementsByTagName('img');
const questionHeader = document.getElementById('question');

images[0].addEventListener('click', imageClicked); 
images[1].addEventListener('click', imageClicked);
images[2].addEventListener('click', imageClicked);
images[3].addEventListener('click', imageClicked);
images[4].addEventListener('click', imageClicked);

setImages();
setQuestions();

function setImages() {
    images[0].src = '../Kalatunnistus_peli_kuvat/kala1.png'; 
    images[1].src = '../Kalatunnistus_peli_kuvat/kala2.png';
    images[2].src = '../Kalatunnistus_peli_kuvat/kala3.png';
    images[3].src = '../Kalatunnistus_peli_kuvat/kala4.png';
    images[4].src = '../Kalatunnistus_peli_kuvat/kala5.png';
}

function setQuestions() {
    questionHeader.textContent = questions[index];
}

function imageClicked(event) {
    console.log("Klikkasit kuvaa:", event.target);
}