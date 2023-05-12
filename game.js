const boardContainer = document.querySelector('.board-container')
let cards = [
  { name: 'B1', img: 'images/hat.png' },
  { name: 'B1', img: 'images/hat.png' },
  { name: 'B2', img: 'images/could.png' },
  { name: 'B2', img: 'images/could.png' },
  { name: 'B3', img: 'images/from.png' },
  { name: 'B3', img: 'images/from.png' },
  { name: 'B4', img: 'images/get.png' },
  { name: 'B4', img: 'images/get.png' },
  { name: 'B5', img: 'images/that.png' },
  { name: 'B5', img: 'images/that.png' },
  { name: 'B6', img: 'images/this.png' },
  { name: 'B6', img: 'images/this.png' }
]
let firstCard, secondCard
let lockBoard = false
let score = 0

document.querySelector('.score').textContent = score

const generateCards = () => {
  for (card of cards) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card')
    cardElement.setAttribute('data-name', card.name)
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src="${card.img}" />
      </div>
      <div class="back"></div>
    `
    boardContainer.appendChild(cardElement)
    cardElement.addEventListener('click', flipCard)
  }
}

generateCards()

const shuffleCards = () => {
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

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped')
    secondCard.classList.remove('flipped')
    resetBoard()
  }, 1000)
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name

  isMatch ? disableCards() : unflipCards()
}
function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
}

function resetBoard() {
  firstCard = null
  secondCard = null
  lockBoard = false
  resetBoard()
}

function restart() {
  resetBoard()
  shuffleCards()
  score = 0
  document.querySelector('.score').textContent = score
  boardContainer.innerHTML = ''
  restartBoard()
}
