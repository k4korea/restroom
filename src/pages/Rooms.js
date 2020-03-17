import React, { Component, Fragment } from 'react';

import { withAuthenticator, Authenticator } from 'aws-amplify-react'

import signUpConfig from '../config/signUpConfig'

import RoomList from '../component/RoomList';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header auth'>
          <Authenticator usernameAttributes='email' />
        </header>
        <header className='App-header'>
          <div className='logo'>
            <img alt='gpdd' src='/gpdd.png' />
          </div>
        </header>
        <RoomList mode="dist" />
      </Fragment>
    );
  }
}

export default withAuthenticator(App, { usernameAttributes: 'email', signUpConfig });
