import React, { Component } from 'react';
import ReactGA from 'react-ga';
import './Game.css';
import Landingpage from '../Landingpage';
import Running from '../Running';
import End from '../End';
ReactGA.initialize('UA-141016488-1', {
  debug: true
});
ReactGA.pageview(window.location.pathname + window.location.search);

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: 'start',
    }
  }
  
  start = (level) => {
    ReactGA.event({
      category: 'GP-Game',
      action: 'start GP-Game',
    })
    this.setState({
      gameState: 'running',
    })
  }

  restart = () => {
    ReactGA.event({
      category: 'GP-Game',
      action: 'restart GP-Game',
    })
    this.setState({
      gameState: 'running',
    })
  }

  ending = (winner) => {
    ReactGA.event({
      category: 'GP-Game',
      action: 'ending GP-Game',
    })
    this.setState({
      gameState: 'ending',
      winner: winner,
    })
  }
  render() {
    if (this.state.gameState === 'start') {
      return (
        <Landingpage gameStart = {this.start} ></Landingpage>
      )
    }
    if (this.state.gameState === 'running') {
      return (
        <Running gameLevel = {this.state.level} gameEnding = {this.ending}></Running>
      );
    }
    if (this.state.gameState === 'ending') {
      return (
        <End winner = {this.state.winner} restart = {this.restart}></End>
      )
    }
  }
}

export default Game;