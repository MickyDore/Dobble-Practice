import React, { Component } from 'react';
import '../Styles/root.css';
import utils from '../Utils/gameUtils.js';
const iconPath = process.env.PUBLIC_URL + '/assets/images/';

class Game extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentCard: "",
      currentGameCard: "",
      currentDeck: [],
      currentLives: 3,
    }
  }

  //Check to see if a new game has been started
  componentDidUpdate = (nextProps, nextState) => {
    //If the parent component's activeGame state has changed from false to true
    if ((!this.props.activeGame) && (nextProps.activeGame)) {
      //then create a new game
      this.createGame();
    }
  }

  //Subtract a life when a user clicks a symbol that isn't a match
  loseALife = () => {
    this.setState({
      currentLives: this.state.currentLives - 1
    }, () => {
      if (this.state.currentLives == 0) {
        this.props.handleNewGame()
      }
    })
  }

  //Function to be called every time the user clicks on a symbol
  handleSymbolClick = (symbol) => {

    //Check if the symbol is the correct match
    let match = utils.findMatch(this.state.currentCard, this.state.currentDeck[0])
    if (symbol == match) {
      this.setState({
        currentCard: this.state.currentDeck.shift()
      }, () => {
        this.props.updateScore(this.props.currentScore + 1)
        if (this.state.currentDeck.length == 1) {
          this.props.handleNewGame(this.props.currentScore);
        }
      })
    } else {
      this.setState({
        currentCard: this.state.currentDeck.shift()
      }, () => {
        if (this.state.currentDeck.length == 1) {
          this.props.handleNewGame(this.props.currentScore);
        }
        this.loseALife()
      })
    }
  }

  //Creates a new deck of shuffled cards and resets the user's lives to 3
  createGame = () => {
    let deck = utils.createGame(); //create a new deck of cards
    let currentCard = deck.shift(); //take the first card from the deck 

    this.props.updateScore(0);
    this.setState({
      currentCard: currentCard,
      currentDeck: deck,
      currentLives: 3
    })
  }

  //Create a new game so that cards can be rendered and displayed
  componentWillMount = () => {
    this.createGame();
  }

  render() {
    let lives = [];
    for (var i = 0; i < this.state.currentLives; i++) {
      lives.push(<div key={i} className='heartIcon'><img alt="life" src={`${iconPath}heart.png`}></img></div>);
    }

    return (
      <div className="gameContainer">
        <div className="cardsContainer">
          <div className="card card-player">
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
            <div className="optionsButton" onClick={() => this.props.handleNewGame(this.props.currentScore)}>New Game</div>
          </div>
          <div className="scoreContainer">Score: {this.props.currentScore}</div>
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

export default Game;
