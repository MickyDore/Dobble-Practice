import React, { Component } from 'react';
import '../Styles/root.css';
import Countdown, { CountdownApi, zeroPad } from 'react-countdown-now';

class Header extends Component {

  countdownApi: CountdownApi | null = null;

  setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      this.countdownApi = countdown.getApi();
    }
  };


  componentDidUpdate = (nextProps, nextState) => {
    if ((this.props.timerStatus == "pause") && (nextProps.timerStatus == "start")) {
      this.countdownApi.pause();
    } else if (nextProps.timerStatus == "pause") {
      this.countdownApi.start();
    }
  }

  render() {
    const renderer = ({ minutes, seconds }) => {
      return <div>Time Left: {zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</div>;
    };

    return (
      <div className="headerContainer">
        <div className="timerContainer">
          <Countdown
            key={this.props.timerDate}
            date={this.props.timerDate}
            autoStart={false}
            renderer={renderer}
            ref={this.setRef}
            onComplete={this.props.handleNewGame}
          >
          </Countdown>
        </div>
        <div className="titleContainer">Spot the match!</div>
        <div className="hiscoreContainer">HiScore: {this.props.currentHiScore}</div>
      </div>
    )
  }
}

export default Header;
