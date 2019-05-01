import React, { Component } from 'react';
import '../Styles/root.css';
import utils from '../Utils/gameUtils.js';
const iconPath = process.env.PUBLIC_URL + '/assets/images/';

class Game extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      currentHiscore: 0,
      currentScore: 0,
      currentCard: "",
      currentGameCard: "",
      currentDeck: [],
      currentLives: 3,
    }
    
  }
  
  componentDidUpdate = (nextProps, nextState) => {
    if ((!this.props.activeGame) && (nextProps.activeGame)) {
      this.createGame();
    }
  }
  
  //Subtract a life when a user clicks a symbol that isn't a life
  loseALife = () => {
    this.setState({
      currentCard: this.state.currentDeck.shift(),
      currentLives: this.state.currentLives - 1
    }, () => {
      if (this.state.currentLives == 0) {
        this.props.handleNewGame()
      }
    })
  }
  
  handleSymbolClick = (symbol) => {
    //Check if the symbol is the correct match
    let match = utils.findMatch(this.state.currentCard, this.state.currentDeck[0])
    if (symbol == match) {
      this.setState({
        currentCard: this.state.currentDeck.shift()
      })
      this.props.updateScore(this.props.currentScore + 1)
      if (this.state.currentDeck.length == 0) {
        alert("Congratulations, you won the game!");
        this.createGame();
      }
    } else {
      this.loseALife()
    }
  }
  
  createGame = () => {
    let deck = utils.createGame()
    let currentCard = deck.shift()
    this.props.updateScore(0)
    this.setState({
      currentCard: currentCard,
      currentDeck: deck,
      currentLives: 3,
    })
  }
  
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
            <div className="optionsButton" onClick={() => this.props.handleNewGame(this.state.currentScore)}>New Game</div>
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
