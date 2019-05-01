//Class expression for a single card object that contains multiple symbols
class Card {
  constructor() {
    this.symbols = new Set()
  }

  addSymbol(symbol) {
    this.symbols.add(symbol)
  }
}


//Creates a deck of 57 cards with 8 symbols
function createGame() {
  var i, j, k
  var r=1
  var n=7

  let cards = []

  let Card1 = new Card();
  for (i = 1; i<= n+1; i++) {
      Card1.addSymbol(i)
  }
  cards.push(Card1)


  for (j=1; j<=n; j++)  {
     r=r+1
     let Card2 = new Card()
     Card2.addSymbol(1)
     for (k=1; k<=n; k++) {
       Card2.addSymbol((n + n * (j-1) + k+1))
     }
     cards.push(Card2)
  }

  for (i= 1; i<=n; i++) {
     for (j=1; j<=n; j++) {
       let Card3 = new Card()
       Card3.addSymbol(i+1)
        for (k=1; k<= n; k++) {
          Card3.addSymbol(n + 2 + n * (k-1) + (((i-1) * (k-1) +j-1) % n))
        }
        cards.push(Card3)
      }
  }

  return shuffle(cards);
}

//Shuffles a deck of cards
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Finds the matching symbol between two cards
function findMatch(a, b) {
  let intersection =
      [...a.symbols].filter(x => b.symbols.has(x));
  return intersection;
}

const utils = {
  createGame,
  shuffle,
  findMatch
};

export default utils;
