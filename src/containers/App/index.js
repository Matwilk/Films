import React, { Component } from 'react';
import Home from '../Home';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container">
          <Home />
        </div>
      </div>
    );
  }
}

export default App;
