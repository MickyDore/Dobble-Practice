import React, {Component} from 'react';
import Game from './Components/Game.js';
import './Styles/root.css';
import Header from './Components/Header.js';
import InfoScreen from './Components/InfoScreen.js';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeGame: false,
      currentScore: 0,
      currentHiScore: 0,
      timerDate: Date.now() + 180000,
      timerStatus: "pause",
      gameEndingtext: "Click the symbol on the left card that matches with a symbol on the right card!"
    }
  }


  //Function to be called when the current game session is ended
  handleNewGame = () => {
    if (this.state.currentScore > this.state.currentHiScore) {
      this.setState({
        currentHiScore: this.state.currentScore,
        activeGame: false,
        gameEndingtext: `You scored ${this.state.currentScore} points and got a new HiScore!`,
        timerStatus: "pause"
      })
    } else {
        this.setState({
          activeGame: false,
          gameEndingtext: `You scored ${this.state.currentScore} points!`,
          timerStatus: "pause"
        })
      }
  }

  //Function to handle creating a new game
  startNewGame = () => {
    this.setState({
      activeGame: true,
      timerDate: Date.now() + 180000,
      timerStatus: "start"
    })
  }

  //Change score upon finding a successful matching symbol
  updateScore = (score) => {
    this.setState({
      currentScore: score
    })
  }


  render() {

    return (
      <div className="appFrame">
        <Header
          currentHiScore={this.state.currentHiScore}
          timerDate={this.state.timerDate}
          handleNewGame={this.handleNewGame}
          timerStatus={this.state.timerStatus}
        >
        </Header>
        {this.state.activeGame ?
          <Game
            currentHiScore={this.state.currentHiScore}
            handleNewGame={this.handleNewGame}
            activeGame={this.state.activeGame}
            currentScore={this.state.currentScore}
            updateScore={this.updateScore}
          >
          </Game> :
          <InfoScreen
            gameEndingtext={this.state.gameEndingtext}
            startNewGame={this.startNewGame}
          >
          </InfoScreen>
        }
      </div>
    );
  }

}

export default App;
