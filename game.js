const selectors = {
  boardContainer: document.querySelector('.board-container'),
  board: document.querySelector('.board'),
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  start: document.querySelector('button'),
  win: document.querySelector('.win')
}
const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null
}

const generateGame = () => {
  const dimensions = selectors.board.getAttribute('data-dimension')

  if (dimensions % 2 !== 0) {
    throw error('must be even')
  }

  const images = [
    'https://i.imgur.com/p8ejsXM.png',
    'https://i.imgur.com/efgP9Mm.png',
    'https://i.imgur.com/Hp4b4OW.png',
    'https://i.imgur.com/vqAvlip.png',
    'https://i.imgur.com/O9LBr5L.png',
    'https://i.imgur.com/ZNLQKqF.png'
  ]
  const picks = pickRandom(images, (dimensions * dimensions) / 2)
  const items = shuffle([...picks, ...picks])

  const parser = new DOMParser().parseFromString(cards, 'text/html')

  selectors.board.replaceWith(parser.querySelector('.board'))
}

const pickRandom = (array, items) => {
  const clonedArray = [...array]
  const randomPicks = []

  for (let index = 0; index < items; index++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length)

    randomPicks.push(clonedArray[randomIndex])
    clonedArray.splice(randomIndex, 1)
  }

  return randomPicks
}

const shuffle = (array) => {
  const clonedArray = [...array]

  for (let index = clonedArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const original = clonedArray[index]

    clonedArray[index] = clonedArray[randomIndex]
    clonedArray[randomIndex] = original
  }

  return clonedArray
}
