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

createCards();

function createCards() {
  cardObj.forEach((cardItem) => {
    cardContainerElem.appendChild(createCard(cardItem));
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
      <img src="${cardItem.imagePath}" alt="" class="card__image">
    </div>
  </div>
  `;
  return cardElem;
}
