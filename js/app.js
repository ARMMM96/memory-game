const cards = document.querySelectorAll('.card');
let hasFlipedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;
    this.classList.add('open');
    setTimeout(card => {
        this.classList.add('show');
    }, 300);

    if (!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;
        return;
    }
    movesCount();
    hasFlipedCard = false;
    secondCard = this;
    cheakForMatch();

}

function cheakForMatch() {
    let isMatch = firstCard.dataset.class === secondCard.dataset.class;
    isMatch ? disableCards() : unFlipCards();
}
let correctCards = 0;


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    correctCards++;
    setTimeout(() => {

        firstCard.classList.add('match');
        secondCard.classList.add('match');
        resetBoard();
    }, 300);
    if (correctCards >= 8) {
        clearInterval(interval);
        winningCase();
    }
}

function unFlipCards() {
    // not a match
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('open', 'show');
        secondCard.classList.remove('open', 'show');
        resetBoard();

    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

let moves = 0,
    counter = document.querySelector(".moves");

function movesCount() {
    moves++;
    counter.innerText = moves;
    tarRsating();
}

let starsList = document.querySelectorAll(".score-panel .stars li i");
let starsList1 = document.querySelectorAll(".congrats .stars li i");

function tarRsating() {
    if (moves == 9) {
        removeStar();
    } else if (moves == 18) {
        removeStar();
    } else if (moves == 36) {
        removeStar();
    };
}
let i = 0;

function removeStar() {
    // if (i >= 2) {return};
    starsList[i].classList.replace("fa-star", "fa-star-o");
    starsList1[i].classList.replace("fa-star", "fa-star-o");

    i++;
}
cards.forEach(card => card.addEventListener('click', flipCard));


// Shuffle function
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}
document.addEventListener('load', shuffle);

// Timer

let ms = 0,
    sec = 0,
    min = 0,
    hour = 0;
const timer = document.querySelector(".timer");
const timer1 = document.querySelector(".timer1");
let interval;
document.addEventListener('click', startTimer);

function startTimer() {
    document.removeEventListener('click', startTimer);
    interval = setInterval(function () {
        timer.innerHTML = `${hour}:${min}:${sec}:${ms}`;
        timer1.innerHTML = `${hour}:${min}:${sec}:${ms}`;
        if (ms == 100) {
            ms = 0;
            if (sec == 60) {
                sec = 0;
                min++;
            }
            if (min == 60) {
                hour++;
                min = 0;
            } else {
                sec++;
            }
        } else {
            ms++;
        }
    }, 10);
}


// reset button
let resetButton = document.querySelector('.restart');

resetButton.addEventListener('click', reaStart);

function reaStart() {

    function clearCards() {
        cards.forEach(card => {
            if (card.classList.contains('open', 'show', 'match')) {
                card.classList.remove('open', 'show', 'match');
            }
        });
        cards.forEach(card => card.addEventListener('click', flipCard));
        starsList.forEach(stars => {
            stars.classList.replace("fa-star-o", "fa-star");
        })

    }

    function restCounter() {
        moves = 0;
        correctCards = 0;
        counter.innerText = moves;
    }
    clearInterval(interval);


    function restTimer() {
        ms = 0,
            sec = 0,
            min = 0;

    }
    restTimer();
    restCounter();
    clearCards();
    startTimer();
    congratMessage.style.display = 'none';
    setTimeout(() => {
        shuffle();
    }, 800);

}

// Winning case
const congratMessage = document.querySelector('.congrats');
const playAgain = document.querySelector('#playAgain');
function winningCase(){
    congratMessage.style.display = 'block';
    clearInterval(interval);

}
playAgain.addEventListener('click', reaStart);