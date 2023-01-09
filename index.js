const cardObj = [
  {
    id: 1,
    imagePath: './images/card-KingHearts.png',
  },
  {
    id: 2,
    imagePath: './images/card-JackClubs.png',
  },
  {
    id: 3,
    imagePath: './images/card-QueenDiamonds.png',
  },
  {
    id: 4,
    imagePath: './images/card-AceSpades.png',
  },
];

const aceId = 4;

const cardContainerElem = document.querySelector('.card-container');
const playGameButtonElem = document.querySelector('#playGame');
let cards = [];
const gridAreaTemplate = '';
const numCards = cardObj.length;
let cardPositions = [];
const areas = '"a a" "a a"';
let gameInProgress = false;
let shufflingInProgress = false;
let cardsRevealed = false;
const currentGameStatusElem = document.querySelector('.header__text');
const scoreElem = document.querySelector('.header__score');
const roundElem = document.querySelector('.header__round');
const winColor = 'green';
const loseColor = 'red';
const primaryColor = 'black';
let roundNum = 0;
let maxRounds = 4;
let score = 0;

loadGame();

function gameOver() {
  updateStatusElem(scoreElem, 'none');
  updateStatusElem(roundElem, 'none');
  const gameOverMessage = `Game Over! Final Score - <span class="header__badge">${score}</span> Click 'Play Game' button to play again`;
  updateStatusElem(currentGameStatusElem, 'block', primaryColor, gameOverMessage);
  gameInProgress = false;
  playGameButtonElem.disabled = false;
}

function endRound() {
  setTimeout(() => {
    if (roundNum === maxRounds) {
      gameOver();
      return;
    } else {
      startRound();
    }
  }, 3000);
}

function chooseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    flipCard(card, false);

    setTimeout(() => {
      flipCards(false);
      updateStatusElem(currentGameStatusElem, 'block', primaryColor, 'Card positions revealed');
      endRound();
    }, 3000);

    cardsRevealed = true;
  }
}

function calculateScoreToAdd(roundNum) {
  if (roundNum === 1) {
    return 100;
  } else if (roundNum === 2) {
    return 50;
  } else if (roundNum === 3) {
    return 25;
  } else {
    return 10;
  }
}

function calculateScore() {
  const scoreToAdd = calculateScoreToAdd(roundNum);
  score = score + scoreToAdd;
}

function updateScore() {
  calculateScore();
  updateStatusElem(scoreElem, 'flex', primaryColor, `Score <span class="header__badge">${score}</span>`);
}

function updateStatusElem(elem, display, color, innerHTML) {
  elem.style.display = display;
  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function outputChoiceFeedBack(hit) {
  if (hit) {
    updateStatusElem(currentGameStatusElem, 'block', winColor, 'Hit!! - Well Done!! :)');
  } else {
    updateStatusElem(currentGameStatusElem, 'block', loseColor, 'Missed!! :(');
  }
}

function evaluateCardChoice(card) {
  if (card.id == aceId) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function loadGame() {
  createCards();

  cards = document.querySelectorAll('.card');

  cardFlyInEffect();

  playGameButtonElem.addEventListener('click', () => {
    startGame();
  });
  updateStatusElem(scoreElem, 'none');
  updateStatusElem(roundElem, 'none');
}

function startGame() {
  initNewGame();
  startRound();
}

function initNewGame() {
  score = 0;
  roundNum = 0;

  shufflingInProgress = false;

  updateStatusElem(scoreElem, 'flex', primaryColor, `Score <span class="header__badge">${score}</span>`);
  updateStatusElem(roundElem, 'flex', primaryColor, `Round <span class="header__badge">${roundNum}</span>`);
}

function startRound() {
  initNewRound();
  transformGridArea(areas);
  flipCards(true);
  shuffleCards();
}

function initNewRound() {
  roundNum++;
  playGameButtonElem.disabled = true;
  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;
  updateStatusElem(currentGameStatusElem, 'block', primaryColor, 'Shuffling...');
  updateStatusElem(roundElem, 'flex', primaryColor, `Round <span class="header__badge">${roundNum}</span>`);
}

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateAreas = areas;
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstElementChild;
  if (flipToBack && !innerCardElem.classList.contains('card--flip')) {
    innerCardElem.classList.add('card--flip');
  } else if (innerCardElem.classList.contains('card--flip')) {
    innerCardElem.classList.remove('card--flip');
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function cardFlyInEffect() {
  const id = setInterval(flyIn, 5);
  let cardCount = 0;
  let count = 0;

  function flyIn() {
    count++;
    if (cardCount === numCards) {
      clearInterval(id);
      playGameButtonElem.style.visibility = 'visible';
    }
    if (count === 1 || count === 250 || count === 500 || count === 750) {
      cardCount++;
      let card = document.getElementById(cardCount);
      card.classList.remove('fly-in');
    }
  }
}

function removeShuffleClasses() {
  cards.forEach((card) => {
    card.classList.remove('shuffle-left', 'shuffle-right');
  });
}

function animateShuffle(shuffleCount) {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 4 == 0) {
    card1.classList.toggle('shuffle-left');
    card1.style.zIndex = 100;
  }
  if (shuffleCount % 10 == 0) {
    card2.classList.toggle('shuffle-right');
    card2.style.zIndex = 200;
  }
}

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;
  function shuffle() {
    randomizeCardPositions();
    animateShuffle(shuffleCount);
    if (shuffleCount === 500) {
      clearInterval(id);
      shufflingInProgress = false;
      removeShuffleClasses();
      dealCards();
      updateStatusElem(currentGameStatusElem, 'block', primaryColor, 'Please click the card that you think is the Ace of Spades...');
    } else {
      shuffleCount++;
    }
  }
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];
  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemp = returnGridAreasMappedToCardPos();
  transformGridArea(areasTemp);
}

function returnGridAreasMappedToCardPos() {
  let firstPart = '';
  let secondPart = '';
  let areas = '';

  cards.forEach((_, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + 'a ';
    } else if (cardPositions[index] == 2) {
      areas = areas + 'b ';
    } else if (cardPositions[index] == 3) {
      areas = areas + 'c ';
    } else if (cardPositions[index] == 4) {
      areas = areas + 'd ';
    }
    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = '';
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });

  console.log(`"${firstPart}" "${secondPart}"`);

  return `"${firstPart}" "${secondPart}"`;
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToContainer(card);
  });
}

function createCards() {
  cardObj.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function createCard(cardItem) {
  const cardElem = document.createElement('div');
  cardElem.classList.add('card', `card-${cardItem.id}`, 'fly-in');
  cardElem.id = cardItem.id;
  cardElem.innerHTML = `
  <div class="card__inner">
    <div class="card__front">
      <img src="${cardItem.imagePath}" alt="" class="card__image">
    </div>
    <div class="card__back">
      <img src="./images/card-back-Blue.png" alt="" class="card__image">
    </div>
  </div>
  `;
  addCardToContainer(cardElem);
  initCardPositions(cardElem);
  attatchClickEventHandlerToCard(cardElem);
}

function attatchClickEventHandlerToCard(card) {
  card.addEventListener('click', () => chooseCard(card));
}

function initCardPositions(card) {
  cardPositions.push(card.id);
}

function addCardToContainer(card) {
  cardContainerElem.appendChild(card);
}
