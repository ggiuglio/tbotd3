import React, { Component } from 'react';
import './App.css';
import  GameContainer from './containers/game.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={GameContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
