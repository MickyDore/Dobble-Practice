import React, {Component} from 'react';
import Game from './Components/Game.js';
import './Styles/root.css';
import Countdown, { CountdownApi, zeroPad } from 'react-countdown-now';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeGame: false,
      currentScore: 0,
      currentHiScore: 0,
      timerDate: Date.now() + 180000,
      gameEndingtext: "Click the symbol on the left card that matches with a symbol on the right card!"
    }
  }

  countdownApi: CountdownApi | null = null;

  setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };

  //Function to be called when the current game session is ended
  handleNewGame = () => {
    if (this.state.currentScore > this.state.currentHiScore) {
      this.setState({
        currentHiScore: this.state.currentScore,
        activeGame: false,
        gameEndingtext: `You scored ${this.state.currentScore} points and got a new HiScore!`,
      }, () => {
        this.countdownApi.pause();
      })
    } else {
        this.setState({
          activeGame: false,
          gameEndingtext: `You scored ${this.state.currentScore} points!`,
        }, () => {
          this.countdownApi.pause();
        })
      }
  }

  //Function to handle creating a new game
  startNewGame = () => {
    //Game component is updated when changing activeGame state to true
    this.setState({
      activeGame: true,
      timerDate: Date.now() + 180000
    }, () => {
      this.countdownApi.start();
    })
  }

  //Change score upon finding a successful matching symbol
  updateScore = (score) => {
    this.setState({
      currentScore: score
    })
  }


  render() {
    const renderer = ({ minutes, seconds }) => {
      return <div>Time Left: {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</div>;
    };

    return (
      <div className="appFrame">
        <div className="headerContainer">
          <div className="timerContainer">
            <Countdown
              key={this.state.timerDate}
              date={this.state.timerDate}
              autoStart={false}
              renderer={renderer}
              ref={this.setRef}
              onComplete={this.handleNewGame}
            >
            </Countdown>
          </div>
          <div className="titleContainer">Spot the match!</div>
          <div className="hiscoreContainer">HiScore: {this.state.currentHiScore}</div>
        </div>
        {this.state.activeGame ? <Game
          currentHiScore={this.state.currentHiScore}
          handleNewGame={this.handleNewGame}
          activeGame={this.state.activeGame}
          currentScore={this.state.currentScore}
          updateScore={this.updateScore}
        >
        </Game> : <div className="gameInfoContainer">
          <div className="gameInfoTextContainer">{this.state.gameEndingtext}</div>
          <div onClick={() => this.startNewGame()} className="gameInfoButton">New Game</div>
        </div> }



      </div>
    );
  }

}

export default App;
