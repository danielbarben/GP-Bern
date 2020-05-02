import React, {Component} from 'react';
import ReactGA from 'react-ga';
import Confetti from 'react-dom-confetti';
import './Ending.css';
import Pokal from '../../img/pokal.png';
ReactGA.initialize('UA-141016488-1', {
  debug: true
});
ReactGA.pageview(window.location.pathname + window.location.search);

class End extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confetti:false,
      }
  }

  componentDidMount() {
    let confetti = () => {
      this.setState({
        confetti:true
      })
    }
    setTimeout(function(){
      confetti();
    }, 1000);
  }

  render() {
    const config = {
      angle: 90,
      spread: 45,
      startVelocity: 45,
      elementCount: 100,
      dragFriction: 0.1,
      duration: 6000,
      stagger: 0,
      width: '10px',
      height: '10px',
      colors: ['#FFFFFF']
    };
    return (
      <div className='Landingpage gamebox'>
        <h2 className='title intro'>{this.props.winner} gewinnt</h2>
        <img src={Pokal} alt='Pokal' className='pokalimg'></img>
        <Confetti active= {this.state.confetti} config={ config } />
        <p className='text'>Gratuliere, Du hast den virtuellen Grand Prix von Bern 2020 gewonnen!</p>
        <span className='button intro' onClick = {() => this.props.restart('leicht')}>Noch einmal!</span>
        </div>
    );
  }
}

export default End;