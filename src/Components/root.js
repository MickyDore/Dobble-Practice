import React, { Component } from 'react';
import '../Styles/root.css';

class Root extends Component {
  render() {
    return(
      <div className="gameContainer">
        <div className="cardsContainer">
          <div className="card"></div>
          <div className="card"></div>
        </div>
        <div className="interactiveContainer">

        </div>
      </div>
    )
  }
}

export default Root;
