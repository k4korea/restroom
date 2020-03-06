import React, { Component, Fragment } from 'react';

import RoomList from './component/RoomList';

import './App.css';
import './pop.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div className='person-detected'>
          <RoomList />
        </div>
      </Fragment>
    );
  }
}

export default App;
