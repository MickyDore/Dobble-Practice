import React, { Component } from 'react';
import '../Styles/root.css';
import utils from '../Utils/gameUtils.js';
const iconPath = process.env.PUBLIC_URL + '/assets/images/';

class Root extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentCard: "", //the users current card displayed on the left hand side
      currentGameCard: "", //the current card in play displayed on the right hand side
      currentDeck: [], //the deck of remaining playing cards
      currentScore: 0, //the users current score - number of correctly guessed matches
      currentLives: 3 //the number of lives left - incorrect guesses lose a life
    }
  };


  componentWillMount = () => {
    this.createGame();
  }

  componentDidMount = () => {

  }

  //Handle what happens when the user clicks on a symbol
  handleSymbolClick = (symbol) => {
    //Check if the symbol is the correct match
    let match = utils.findMatch(this.state.currentCard, this.state.currentDeck[0])
    if (symbol == match) {
      this.setState({
        currentScore: this.state.currentScore + 1,
        currentCard: this.state.currentDeck.shift()
      })
      if (this.state.currentDeck.length == 0) {
        alert("Congratulations, you won the game!");
        this.createGame();
      }
    } else {
      this.loseALife()
    }
  }

  //Create a new game of dobble with a fresh deck
  createGame = () => {
    let deck = utils.createGame()
    let currentCard = deck.shift()
    this.setState({
      currentCard: currentCard,
      currentDeck: deck,
      currentScore: 0,
      currentLives: 3
    })
  }

  //Subtract a life when a user clicks a symbol that isn't a life
  loseALife = () => {
    this.setState({
      currentLives: this.state.currentLives - 1
    }, () => {
      if (this.state.currentLives == 0) {
        alert("You have run out of lives!");
        this.createGame();
      }
    })
  }


  render() {
    let lives = [];
    for (var i = 0; i < this.state.currentLives; i++) {
      lives.push(<div className='heartIcon'><img alt="life" src={`${iconPath}heart.png`}></img></div>);
    }

    return (
      <div className="gameContainer">
        <div className="cardsContainer">
          <div className="card">
            {utils.shuffle([...this.state.currentCard.symbols]).map((symbol, index) => {
              let randomAngle = (Math.floor(Math.random() * 90 + 1) - 45);
              return <div
                key={index}
                style={{transform: `rotate(${randomAngle}deg)`}}
                value={symbol}
                onClick={() => this.handleSymbolClick(symbol)}
                className="symbol symbol-player">
                  <img alt="symbol" src={`${iconPath}${symbol}.png`} />
                </div>
            })}
          </div>
          <div className="card">
            {utils.shuffle([...this.state.currentDeck[0].symbols]).map((symbol, index) => {
              let randomAngle = (Math.floor(Math.random() * 90 + 1) - 45);
              return <div
                key={index}
                style={{transform: `rotate(${randomAngle}deg)`}}
                className="symbol">
                  <img alt="symbol" src={`${iconPath}${symbol}.png`} />
                </div>
            })}
          </div>
        </div>
        <div className="interactiveContainer">
          <div className="optionsContainer">
            <div className="optionsButton" onClick={this.createGame}>New Game</div>
          </div>
          <div className="scoreContainer">Score: {this.state.currentScore}</div>
          <div className="livesContainer">
            <div className="livesTextContainer">Lives: </div>
            <div className="heartsContainer">
              {lives}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Root;
