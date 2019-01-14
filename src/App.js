import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './components/Slider/Slider';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Slider />
      </div>
    );
  }
}

export default App;
