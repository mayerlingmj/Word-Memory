const boardContainer = document.querySelector('.board-container')
let cards = [
  { name: 'B1', img: 'https://i.imgur.com/p8ejsXM.png' },
  { name: 'B2', img: 'https://i.imgur.com/efgP9Mm.png' },
  { name: 'B3', img: 'https://i.imgur.com/Hp4b4OW.png' },
  { name: 'B4', img: 'https://i.imgur.com/vqAvlip.png' },
  { name: 'B5', img: 'https://i.imgur.com/O9LBr5L.png' },
  { name: 'B6', img: 'https://i.imgur.com/ZNLQKqF.png' }
]
let firstCard, secondCard
let lockBoard = false
let score = 0

document.querySelector('.score').textContent = score

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = cards[currentIndex]
    cards[currentIndex] = cards[randomIndex]
    cards[randomIndex] = temporaryValue
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.setAttribute('data-name', card.name)
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src="${card.image}" />
      </div>
      <div class="back"></div>
    `
    boardContainer.appendChild(cardElement)
    cardElement.addEventListener('click', flipCard)
  }
}
function flipCard() {
  if (lockBoard) return
  if (this === firstCard) return

  this.classList.add('flipped')

  if (!firstCard) {
    firstCard = this
    return
  }

  secondCard = this
  score++
  document.querySelector('.score').textContent = score
  lockBoard = true

  checkForMatch()
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name

  isMatch ? disableCards() : unflipCards()
}
