//constants//
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
  { name: 'B6', img: 'images/this.png' },
  { name: 'B7', img: 'images/these.png' },
  { name: 'B7', img: 'images/these.png' },
  { name: 'B8', img: 'images/her.png' },
  { name: 'B8', img: 'images/her.png' }
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
  //Fisher Yates source
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
//Functions get cards to do everything//

//create flip card function//
//easier when I seperated cards//

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

//create unflipped card function//

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

// add event listeners//
function disableCards() {
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)

  resetBoard()
}

//get cards to reset and reload//

function resetBoard() {
  firstCard = null
  secondCard = null
  lockBoard = false
}

//have the ability to restart once done//

function restart() {
  resetBoard()
  shuffleCards()
  score = 0
  document.querySelector('.score').textContent = score
  boardContainer.innerHTML = ''
  generateCards()
}
document.querySelector('main').addEventListener('click', handleChoice)
