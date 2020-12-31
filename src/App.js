import React, { Component } from 'react'
import Countdown from './components/Countdown'
import Countdown1 from './components/Countdown1'
import Header from './components/Header'
import './App.css'
import logo from './simi.jpg'; // Tell webpack this JS file uses this image
import logo2 from './arsath.jpg'; 
import logo3 from './shifa2.jpg'; 


import moment from 'moment'

// Formats digits to two digits (e.g. 05)
const formatTimerDigit = digit => {
  return digit > 9 ? digit : '0' + digit
}

// Format the countdownText to include labels and set to blank when value is 0 (strict)
// When strict is true, set the value to blank when digit is 0
const formatCountdownTextLabel = (digit, label, strict) => {
  if( strict ) return digit > 0 ? formatTimerDigit(digit) + label : ''
  else return formatTimerDigit(digit) + label
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newYear: '2021',
      countdownText: '',
      time: new Date().toLocaleString(),
      name:['SIMI','ARSATH','SHIFA'],
      pos:0
    }
  
    // This binding is necessary to make `this` work in the callback
   // this.handleClick = this.handleClick.bind(this);
  }


  handleClick=() =>{
    this.setState({
      countdownText: "Hi simi and arsath!! Wish You Happy new year"
    });
  }

  toggleHover=()=> {
    this.setState({countdownText: "Hi simi and arsath!! Wish You Happy new year"});
    console.log("js");
  }
  
  timer = newYear => {
    const eventTime = moment(
      `01-01-${newYear} 00:00:00`,
      'DD-MM-YYYY HH:mm:ss'
    ).unix()
    const currentTime = moment().unix()
    const diffTime = eventTime - currentTime
    let duration = moment.duration(diffTime * 1000, 'milliseconds')
    const interval = 1000

    if (diffTime > 0) {
      setInterval(() => {
        duration = moment.duration(
          duration.asMilliseconds() - interval,
          'milliseconds'
        )

        // Format the months/days/hours/mins/secs with labels
        const months = formatCountdownTextLabel(duration.months(), 'mo ', true)
        const days = formatCountdownTextLabel(duration.days(), 'd ', true)
        const hours = formatCountdownTextLabel(duration.hours(), 'h ', true)
        const mins = formatCountdownTextLabel(duration.minutes(), 'm ', true)
        const secs = formatCountdownTextLabel(duration.seconds(), 's ', false)

        this.setState({ countdownText: months + days + hours + mins + secs })
      }, interval)
    } else {
      this.setState({ countdownText: 'Happy New Year  ' })
    }
  }

  render() {
    const { newYear, countdownText } = this.state
    const renderName=this.state.name[this.state.pos]
console.log(this.state.pos);
    return (

      <div  className="App">
       
        
      
      
        <Countdown   />
        <img src={logo} alt="Logo" width="300" height="300"   />
        <Countdown1  text={countdownText} />
                <Countdown  
        
          />
          <img src={logo2} alt="Logo2" width="300" height="300"   /> 
          <Countdown1   text={renderName} />
        <Countdown />

        <img src={logo3} alt="Logo2" width="300" height="300"   />
        <Countdown1  text={this.state.time} className="App-clock"  />
            
         

      </div>
    )
  }

  componentDidMount() {
    // Get the new year from state
    const { newYear } = this.state
    // Call the timer function
    this.timer(newYear)


    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );

  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString(),
      pos: (this.state.pos+1)%3
    });
  }
}

export default App
