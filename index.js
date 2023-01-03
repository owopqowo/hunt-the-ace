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

const cardContainerElem = document.querySelector('.card-container');
const playGameButtonElem = document.querySelector('#playGame');
let cards = [];
const gridAreaTemplate = '';
const numCards = cardObj.length;
let cardPositions = [];
const areas = '"a a" "a a"';

loadGame();

function loadGame() {
  createCards();

  cards = document.querySelectorAll('.card');

  playGameButtonElem.addEventListener('click', () => {
    startGame();
  });
}

function startGame() {
  initNewGame();
  startRound();
}

function initNewGame() {}

function startRound() {
  initNewRound();
  transformGridArea(areas);
  flipCards(true);
  shuffleCards();
}

function initNewRound() {}

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

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;
  function shuffle() {
    randomizeCardPositions();
    if (shuffleCount === 500) {
      clearInterval(id);
      dealCards();
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
  cardElem.classList.add('card', `card-${cardItem.id}`);
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
}

function initCardPositions(card) {
  cardPositions.push(card.id);
}

function addCardToContainer(card) {
  cardContainerElem.appendChild(card);
}
