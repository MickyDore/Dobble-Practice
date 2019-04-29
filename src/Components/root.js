import React, { Component } from 'react';
import '../Styles/root.css';
import utils from '../Utils/gameUtils.js';
const iconPath = process.env.PUBLIC_URL + '/assets/images/';

class Root extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentCard: "",
      currentGameCard: "",
      currentDeck: [],
      currentScore: 0,
      currentLives: 3
    }
  };


  componentWillMount = () => {
    this.createGame();
  }

  componentDidMount = () => {
    console.log(this.state);
  }

  handleSymbolClick = (symbol) => {

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
    }

  }

  //Create a new game of dobble with a fresh deck
  createGame = () => {
    let deck = utils.createGame()
    let currentCard = deck.shift()
    this.setState({
      currentCard: currentCard,
      currentDeck: deck,
      currentScore: 0
    })
  }


  render() {

    return(
      <div className="gameContainer">
        <div className="cardsContainer">
          <div className="card">{utils.shuffle([...this.state.currentCard.symbols]).map((symbol, index) => {
              let randomAngle = (Math.floor(Math.random() * 90 + 1) - 45);
              return <div key={index} style={{transform: `rotate(${randomAngle}deg)`}} value={symbol} onClick={() => this.handleSymbolClick(symbol)} className="symbol symbol-player"><img src={`${iconPath}${symbol}.png`}></img></div>
            })}</div>
          <div className="card">
            {utils.shuffle([...this.state.currentDeck[0].symbols]).map((symbol, index) => {
              let randomAngle = (Math.floor(Math.random() * 90 + 1) - 45);
              return <div key={index} style={{transform: `rotate(${randomAngle}deg)`}} className="symbol"><img src={`${iconPath}${symbol}.png`}></img></div>
            })}
          </div>
        </div>
        <div className="interactiveContainer">
          <div className="scoreContainer">Score: {this.state.currentScore}</div>
        </div>
      </div>
    )
  }
}

export default Root;
