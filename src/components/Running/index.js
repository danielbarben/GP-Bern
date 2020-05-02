import React, {Component} from 'react';
import './Running.css';
import Mapsvg from '../../img/Mapsvg.js'
import Messages from '../../data/messages.js';
import Actions from '../../data/actions.js';

class Running extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {'blue': {'pos':0, 'action':false, 'twice':false, 'name':'Blau'}, 'orange': {'pos':0, 'action':false, 'twice':false, 'name': 'Orange'}},
      dices: {'blue': {'msg':'Blauer Würfel', 'class':'dice blue', 'clickable':false}, orange:{'msg':'Oranger Würfel','class':'dice orange', 'clickable':false}},
      message: Messages[0],
      onTurn: 'orange'
    }
  }

  //0:rot, 1:weiss, 2: blue, 3: orange
  colors = ['#c00830', '#FFFFFF', '#005977', '#f59d24', '#009869', '#c13286']
  //Positionen für Spielsteine
  positions = [[360,30],[400,30],[440,30],[440,70],[440,110],[440,150],[480,150],[520,150],[560,150],[600,150],[640,150],[680,150],[680,190],[680,230],[680,270],[640,270],[600,270],[560,270],[520,270],[480,270],[440,270],[440,310],[440,350],[440,390],[480,390],[520,390],[560,390],[560,430],[560,470],[560,510],[520,510],[480,510],[440,510],[400,510],[360,510],[360,550],[360,590],[360,630],[400,630],[440,630],[440,670],[480,670],[520,670],[560,670],[560,630],[560,590],[600,590],[640,590],[680,590],[720,590],[720,630],[720,670],[720,710],[720,750],[720,790],[720,830],[680,830],[640,830],[600,830],[560,830],[520,830],[480,830],[440,830],[440,790],[440,750],[400,750],[360,750],[320,750],[280,750],[280,790],[280,830],[240,830],[200,830],[160,830],[120,830],[80,830],[40,830],[40,790],[40,750],[40,710],[40,670],[40,630],[80,630],[120,630],[160,630],[200,630],[240,630],[240,590],[240,550],[240,510],[200,510],[160,510],[160,470],[160,430],[160,390],[200,390],[240,390],[280,390],[320,390],[320,350],[320,310],[280,310],[240,310],[200,310],[160,310],[160,270],[160,230],[160,190],[160,150],[200,150],[240,150],[280,150],[320,150],[320,110]];

  diceClasses = {'blue': {'active':'dice blue blinkBlue active', 'passive':'dice blue'},'orange': {'active':'dice orange blinkOrange active', 'passive':'dice orange'}}

winner = (player) => {
  this.props.gameEnding(this.state.players[player].name);
}

activateDice = (player) => {
  let newDices = this.state.dices;
  newDices[player].class = this.diceClasses[player]['active'];
  newDices[player].msg = 'Bitte würfeln';
  newDices[player].clickable = true;
  this.setState({
    dices: newDices,
  })
}

doActions = (player) => {
    let action = Actions[this.state.players[player].action].action;
    let pos = this.state.players[player].pos;
    let tile = document.getElementById(player);
    let newPos = 0;
    let steps = [];
    let otherPlayer = (player === 'blue') ? 'orange' : 'blue';
    //Aktion löschen
    let newPlayers = this.state.players;
    newPlayers[player]['action'] = false;
    //newPlayers[otherPlayer]['action'] = false;

    this.setState({
      players: newPlayers
    })
    //Aktion ausführen
    switch(action) {
      case 1:
        //aussetzen
        if (this.state.players[player]['twice'] === true) {
          newPlayers[player]['twice'] = false;
        }
        else {
          newPlayers[otherPlayer]['twice'] = true;
        }
        //newPlayers[otherPlayer]['twice'] = this.state.players[player]['twice'] ? false: true;
        this.setState({
          players: newPlayers
        })
        this.activateDice(otherPlayer);
        break;
      case 2:
        //noch einmal
        this.activateDice(player)
        break;
      case 3:
        //6 Felder zurück
        newPos = (pos - 6) 
        for (let i = 0; i < 6; i++) {
          steps.push(this.positions[pos-1-i]);
        }
        newPlayers[player].pos = newPos;
        this.setState({
          players: newPlayers,
        })
        this.move(steps,tile,this.nextMove,player)
        break;
      case 4:
        //6 Felder vor
        newPos = (pos + 6) 
        for (let i = 0; i < 6; i++) {
          steps.push(this.positions[i+pos+1]);
        }
        newPlayers[player].pos = newPos;
        this.setState({
          players: newPlayers,
        })
        this.move(steps,tile,this.nextMove,player)
      break
      default:
      break;
    }
  }

  nextMove = (player) => {
    //Figuren übereinander?
    if (this.state.players['orange'].pos === this.state.players['blue'].pos) {
      let tile = document.getElementById(player);
      let xpos = this.positions[this.state.players[player].pos][0] - 370;
      let ypos = this.positions[this.state.players[player].pos][1] - 40;
      tile.style.transform = `translate(${xpos}px,${ypos}px)`;
     }
    //Aktionsfeld prüfen
    if (Actions[this.state.players[player].action]) {
      let who = this.state.players[player].name
      let newMsg = `${who}: ${Actions[this.state.players[player].action].msg}`;    
      this.setState({
        message: newMsg,
      })
      this.doActions(player)
    }
    else {
      //Aussetzen?
      if (this.state.players[player]['twice'] === true) {
        //Status zurücksetzen
        let otherPlayer = (player === 'blue') ? 'orange' : 'blue';
        let newPlayers = this.state.players;
        newPlayers[player]['twice'] = false;
        newPlayers[otherPlayer]['twice'] = false;
        console.log(newPlayers)
        this.setState({
          players: newPlayers
        })
        this.activateDice(player)
        }
      else {
        //Spieler tauschen
        let newPlayer = (player === 'blue') ? 'orange' : 'blue';
        this.activateDice(newPlayer);
      }
    }
  }

  move(steps,tile,nxt,player) {
    let i = 0;
    function movesteps() {
    setTimeout(function() {
      let moveX = steps[i][0] - 360;
      let moveY = steps[i][1] - 30;
      tile.style.transform = "translate(" + moveX + "px," + moveY + "px)";
      i++;
      if (i < steps.length) {
        movesteps();
      }
      else {  
        nxt(player)
      };
    }, 600)
  }
  movesteps(); 
}
  
// Würfeln
roll(player) {
  //würfeln
  let dice = Math.floor(Math.random() * Math.floor(6)) + 1;
  //aktuelle Positionen suchen und neue berechnen
  let pos = this.state.players[player].pos;
  dice = (pos + dice) > 113 ? 113-pos : dice
  let newPos = (pos + dice);
  if (Actions[newPos]) {
    let newPlayers = this.state.players;
    newPlayers[player]['action'] = newPos;
    this.setState({
      players: newPlayers,
    })
  }
  //Spielstein auswählen
  let tile = document.getElementById(player);
  //Feldweise Vorrücken
  //Positionen sammeln
  let steps = [];
  for (let i = 0; i < dice; i++) {
    steps.push(this.positions[i+pos+1]);
  }
  //Würfel aktualisieren
  let newDices = this.state.dices;
  newDices[player].msg = (newPos === 113) ? "gewonnen" : dice;
  newDices[player].class = this.diceClasses[player]['passive'];
  newDices[player].clickable = false;
  this.setState({
    dices: newDices,
  })
  let newPlayers = this.state.players;
  newPlayers[player].pos = newPos;
  this.setState({
    players: newPlayers
  })
    //Spielstein bewegen
    if (newPos === 113) {
      this.move(steps,tile,this.winner,player)
    }
    else {
      this.move(steps,tile,this.nextMove,player)
    }
    //Nachricht aktualisieren
    let newMsg = (Messages[newPos]) ? " und " + Messages[newPos] : "";
    let who = this.state.players[player].name
    this.setState({
      message: `${who} hat eine ${dice} gewürfelt${newMsg}`,
  })
}

prepare = () => {
  let Orange = document.getElementById('orange');
  Orange.style.fill = this.colors[3];
  let xpos = 0;
  let ypos = 10;
  Orange.style.transform = `translate(${xpos}px,${ypos}px)`;
  ypos = -10
  let Blue = document.getElementById('blue');
  Blue.style.fill = this.colors[2];
  Blue.style.transform = `translate(${xpos}px,${ypos}px)`;
  
  let random = Math.floor(Math.random() * Math.floor(2));
  let first = ['blue','orange'];
  this.activateDice(first[random]);
  let newMsg = this.state.players[first[random]].name + " " + Messages[0];    
  this.setState({
    message: newMsg,
  })
}

start = () => {
  this.prepare();
}

componentDidMount() {
  this.start()
}

  render() {
    return (
      <div className = "Running gamebox">
        <div className = "subtitle">Würfeln Sie sich zum GP-Sieg</div>
        <Mapsvg className = "svgMap" />
        <div className = "display">
          <div className = "message">{this.state.message}</div>
            <div className =" dicebar">
            <div className = {this.state.dices['blue'].class} onClick={()=> this.state.dices['blue'].clickable ? this.roll('blue') : ''} >{this.state.dices['blue'].msg}</div>
              <div className = {this.state.dices['orange'].class} onClick={()=> this.state.dices['orange'].clickable ? this.roll('orange') : ''} >{this.state.dices['orange'].msg}</div>
            </div>
        </div>
      </div>
    );
  }
}

export default Running;