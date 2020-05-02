import React, {Component} from 'react';
import './Landingpage.css';
import Dice from '../../img/dice.png';

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="Landingpage gamebox">
        <h2 className="title intro">Würfeln Sie sich<br></br>zum GP-Sieg</h2>
        <img key="123" src={Dice} alt="Würfel" className="diceimg"></img>
        <p className="text">Lockern Sie die Handgelenke und machen Sie sich bereit, um den Grand Prix von Bern virtuell zu gewinnen - mit all den Stolpersteinen, Freuden und Frustrationen.</p>
        <p className="text">Auf die Plätze, fertig, </p>
        <span className="button intro" onClick = {() => this.props.gameStart()}>los!</span>
        <p className="quelle">Text: Jürg Steiner<br></br>Programmierung: Daniel Barben</p>
      </div>
    );
  }
}

export default Landingpage;