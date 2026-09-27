const db = {
    informatika: [
        {question: "Kompyuterning asosiy qismi qaysi?", options: ["Monitor", "Protsessor", "Klaviatura", "Printer"], answer: 1},
        {question: "1 Bayt necha bitdan iborat?", options: ["4", "8", "16", "32"], answer: 1},
        {question: "Quyidagilardan qaysi biri operatsion tizim?", options: ["Word", "Windows", "Excel", "Photoshop"], answer: 1},
        {question: "Internet tarmog'ining asosiy protokoli nima?", options: ["HTTP", "TCP/IP", "FTP", "SMTP"], answer: 1},
        {question: "Ma'lumotlarni uzoq vaqt saqlaydigan qurilma?", options: ["RAM", "Kesh xotira", "Qattiq disk (HDD/SSD)", "Registr"], answer: 2},
    ].concat(Array.from({length: 95}, (_, i) => ({
        question: `Informatika fanidan ${i+6}-savol: Kompyuter texnologiyalari va dasturlashga oid test savoli`,
        options: ["1-variant", "To'g'ri javob", "3-variant", "4-variant"],
        answer: 1
    }))),

    matematika: [
        {question: "5 ning kvadrati nechaga teng?", options: ["10", "25", "15", "20"], answer: 1},
        {question: "Uchburchak ichki burchaklari yig'indisi?", options: ["90°", "180°", "360°", "270°"], answer: 1},
        {question: "12 ni 4 ga bo'lgandagi qoldiq?", options: ["0", "1", "2", "3"], answer: 0},
        {question: "Kvadratning yuzasi qanday topiladi?", options: ["a * 4", "a * a", "2 * (a + b)", "a * b * c"], answer: 1},
        {question: "Eng kichik tub son qaysi?", options: ["0", "1", "2", "3"], answer: 2},
    ].concat(Array.from({length: 95}, (_, i) => ({
        question: `Matematika fanidan ${i+6}-savol: Arifmetik yoki algebraik hisob-kitob savoli`,
        options: ["A variant", "To'g'ri javob", "C variant", "D variant"],
        answer: 1
    }))),

    tarix: [
        {question: "Amir Temur qachon tug'ilgan?", options: ["1336-yil", "1370-yil", "1405-yil", "1226-yil"], answer: 0},
        {question: "Alisher Navoiy qachon tug'ilgan?", options: ["1441-yil", "1336-yil", "1483-yil", "1500-yil"], answer: 0},
        {question: "O'zbekiston Respublikasi Mustaqillik kuni?", options: ["1-sentabr", "31-avgust", "8-mart", "21-mart"], answer: 0},
        {question: "Buyuk ipak yo'li necha asr davomida xizmat qilgan?", options: ["5 asr", "10 asr", "Ko'p asrlar", "1 asr"], answer: 2},
        {question: "Xiva xonligiga asos solgan sulola?", options: ["Shayboniylar", "Mang'itlar", "Arabshohiylar", "Temuriylar"], answer: 2},
    ].concat(Array.from({length: 95}, (_, i) => ({
        question: `O'zbekiston tarixi fanidan ${i+6}-savol: Tarixiy sana va shaxslarga oid test`,
        options: ["Noto'g'ri javob", "To'g'ri javob", "Xato variant 1", "Xato variant 2"],
        answer: 1
    })))
};

let currentSubject = '';
let currentQuestions = [];
let currentIndex = 0;
let score = 0;

const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const scoreScreen = document.getElementById('score-screen');

const subjectTitle = document.getElementById('subject-title');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const finalScore = document.getElementById('final-score');

function startQuiz(subject) {
    currentSubject = subject;
    currentQuestions = db[subject];
    currentIndex = 0;
    score = 0;

    homeScreen.classList.add('hide');
    scoreScreen.classList.add('hide');
    quizScreen.classList.remove('hide');

    subjectTitle.innerText = "Fan: " + subject.toUpperCase() + " (100 ta savol)";
    loadQuestion();
}

function loadQuestion() {
    if (currentIndex >= currentQuestions.length) {
        showScore();
        return;
    }

    let q = currentQuestions[currentIndex];
    questionCounter.innerText = `Savol: ${currentIndex + 1} / ${currentQuestions.length}`;
    scoreDisplay.innerText = `Ball: ${score}`;
    questionText.innerText = q.question;

    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
        let btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, q.answer, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct, buttonElement) {
    const allButtons = optionsContainer.querySelectorAll('button');
    allButtons.forEach(btn => btn.disabled = true);

    if (selected === correct) {
        buttonElement.style.backgroundColor = '#10b981';
        buttonElement.style.color = '#ffffff';
        score++;
    } else {
        buttonElement.style.backgroundColor = '#ef4444';
        buttonElement.style.color = '#ffffff';
        allButtons[correct].style.backgroundColor = '#10b981';
        allButtons[correct].style.color = '#ffffff';
    }

    scoreDisplay.innerText = `Ball: ${score}`;

    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 1200);
}

function showScore() {
    quizScreen.classList.add('hide');
    scoreScreen.classList.remove('hide');
    finalScore.innerText = `Siz 100 ta savoldan ${score} tasiga to'g'ri javob berdingiz!`;
}

function goHome() {
    scoreScreen.classList.add('hide');
    homeScreen.classList.remove('hide');
}