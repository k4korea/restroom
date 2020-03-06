import React, { Component, Fragment } from 'react';

import RoomList from './component/RoomList';

import './App.css';
import './pop.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header'>
          <div className='logo'>
            <img alt='deepracer' src='/gpdd.png' />
          </div>
        </header>
        <RoomList />
      </Fragment>
    );
  }
}

export default App;
