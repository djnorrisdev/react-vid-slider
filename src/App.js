import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Slider from './components/Slider';
import video from "./videos/snow_aerial.mp4";

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: 
      {
        src: video
      }
    }
  }
  render() {
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
