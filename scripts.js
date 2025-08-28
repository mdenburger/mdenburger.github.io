const cards = document.querySelectorAll('.memory-card');
const solution = document.querySelectorAll('.solution')[0];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesFound = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    setTimeout(checkDone, 1000);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkDone() {
    matchesFound += 1;

    console.log("Matches found: " + matchesFound);

    if (matchesFound === (cards.length / 2)) {
        solution.classList.remove('hidden');
    }
}

function hideExplanation() {
    const explanation = document.querySelectorAll('.explanation')[0];
    explanation.classList.add('hidden');
}

(function shuffle() {
    cards.forEach(card => {
        card.style.order = String(Math.floor(Math.random() * 12));
    });
})();

setTimeout(hideExplanation, 10000);

cards.forEach(card => card.addEventListener('click', flipCard));

