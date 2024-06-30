const title = document.getElementById('thettl');
const startButton = document.getElementById('start-button');
const settingButton = document.getElementById('setting-button');
const gameElements = document.getElementById('game-elements');
const horrorElements = document.getElementById('horror-elements');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const horrorImage = document.getElementById('horror-image');
const horrorText = document.getElementById('horror-text');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const backsound = document.getElementById('backsound');
const endsound = document.getElementById('endsound');
const setDiv = document.getElementById('setdiv');
const psulit = document.getElementById('kesulitannya');

const words = ["seram", "hantu", "menyeramkan", "misteri", "takut", "busuk", "penyihir", "toilet", "bau", "setan", "ocong", "kuburan", "jasad", "mayat", "tahu", "jelangkung", "manusia", "bubur", "surga", "neraka", "suster", "sakit", "jantung", "babi", "anjing", "666666", "iblis", "jin", "gila", "merapi", "jumat", "purnama", "kliwon", "monyet", "12345679", "rumput", "bambu", "pohon", "pisang", "naga", "dukun", "malam", "gelap", "hitam", "kenangan", "kesedihan", "dimensi"];
const horrorImages = ["image/h1.jpg", "image/h2.jpg", "image/h3.jpg", "image/h4.jpg", "image/h5.jpg", "image/h6.jpg", "image/h7.jpg"];
let currentWord = "";
let timer;
let score = 0;
let timeMode = 1;
let kesulitan = "";

startButton.addEventListener('click', startGame);
sendButton.addEventListener('click', checkInput);
userInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' && !sendButton.disabled) {
        checkInput();
    }
});

function openSetting() {
    setDiv.classList.toggle('dsip');
}

function selectLevel(mode) {
    if (mode == 'very-easy') {
        timeMode = 2.50;
        kesulitan = 'Very Easy'
    } else if (mode == 'easy') {
        timeMode = 2;
        kesulitan = 'Easy'
    } else if (mode == 'medium') {
        timeMode = 1.50;
        kesulitan = 'Medium'
    } else if (mode == 'hard') {
        timeMode = 1;
        kesulitan = 'Hard'
    } else if (mode == 'very-hard') {
        timeMode = 0.75;
        kesulitan = 'Very Hard'
    } else if (mode == 'nightmare') {
        timeMode = 0.50;
        kesulitan = 'Nightmare'
    } else if (mode == 'impossible') {
        timeMode = 0.25;
        kesulitan = 'Impossible'
    }
    alert('Berhasil mengubah kesulitan menjadi: ' + kesulitan);
}

function startGame() {
    backsound.play();
    document.getElementById('score').style.display = 'block';
    startButton.style.display = 'none';
    settingButton.style.display = 'none';
    gameElements.style.display = 'block';
    title.style.display = 'none';
    showHorror();
    console.log('Permainan dimulai!');
}

function showHorror() {
    userInput.disabled = true;
    sendButton.disabled = true;

    const randomTime = Math.random() * 5000 + 1000;
    setTimeout(() => {
        const randomImage = horrorImages[Math.floor(Math.random() * horrorImages.length)];
        horrorImage.src = randomImage;

        currentWord = words[Math.floor(Math.random() * words.length)];
        const duration = Math.ceil(currentWord.length * timeMode) * 1000; // Calculate time in milliseconds

        horrorText.textContent = currentWord.toUpperCase();
        horrorElements.style.display = 'block';

        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
        userInput.placeholder = 'Cepat ketik!';
        
        startTimer(duration);
    }, randomTime);
}

function startTimer(duration) {
    let timeLeft = duration / 1000;
    timerElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
}

function checkInput() {
    if (userInput.value.toLowerCase() === currentWord.toLowerCase()) {
        clearInterval(timer);
        score++;
        scoreElement.textContent = 'Score: ' + score;
        resetForNextRound();
    } else {
        userInput.value = '';
    }
}

function gameOver() {
    endsound.play();
    backsound.pause();
    console.log('Permainan selesai!');
    backsound.currentTime = 0;
    resetGame();
    alert('Game Over');
    horrorImage.src = '';
}

function resetForNextRound() {
    horrorElements.style.display = 'none';
    userInput.value = '';
    showHorror();
}

function resetGame() {
    horrorElements.style.display = 'none';
    gameElements.style.display = 'none';
    startButton.textContent = 'Play Again'
    startButton.style.display = 'block';
    title.textContent = 'TYPER HORROR';
    title.style.display = 'block';
    userInput.value = '';
    scoreElement.textContent = 'Last score: ' + score;
    console.log('-- Skor terakhir: ' + score);
    score = 0;
}

function modeSubmit(event) {
    event.preventDefault();
    var selectElement = document.getElementById("gamemode");
    var selectedValue = selectElement.value;
    var pstcnt = 'Kesulitan: '

    if (selectedValue == 'very-easy') {
        timeMode = 1.50;
        kesulitan = 'Very Easy';
        psulit.textContent = pstcnt + kesulitan;
    } else if (selectedValue == 'easy') {
        timeMode = 1.25;
        kesulitan = 'Easy';
        psulit.textContent = pstcnt + kesulitan;
    } else if (selectedValue == 'medium') {
        timeMode = 1;
        kesulitan = 'Medium';
        psulit.textContent = pstcnt + kesulitan;
    } else if (selectedValue == 'hard') {
        timeMode = 0.50;
        kesulitan = 'Hard';
        psulit.textContent = pstcnt + kesulitan;
    } else if (selectedValue == 'very-hard') {
        timeMode = 0.30;
        kesulitan = 'Very Hard';
        psulit.textContent = pstcnt + kesulitan;
    } else if (selectedValue == 'nightmare') {
        timeMode = 0.20;
        kesulitan = 'Nightmare';
        psulit.textContent = pstcnt + kesulitan;
    } else if (selectedValue == 'impossible') {
        timeMode = 0.15;
        kesulitan = 'Impossible';
        psulit.textContent = pstcnt + kesulitan;
    } else {
        timeMode = 999;
        kesulitan = 'God';
        psulit.textContent = pstcnt + kesulitan;
    }
    alert('Berhasil mengubah kesulitan menjadi: ' + kesulitan);
    console.log('Tingkat kesulitan diubah menjadi: ' + kesulitan);
}


console.log('============================');
console.log('# GAME DIBUAT OLEH DYN CRAZY');
console.log('============================');
console.log(' ');