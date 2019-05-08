import React, { Component } from 'react';
import '../Styles/root.css';

class InfoScreen extends Component {

  render() {

    return (
      <div className="gameInfoContainer">
        <div className="gameInfoTextContainer">{this.props.gameEndingtext}</div>
      <div onClick={() => this.props.startNewGame()} className="gameInfoButton">New Game</div>
      </div>
    )
  }
}

export default InfoScreen;
