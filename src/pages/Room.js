import React, { Component, Fragment } from 'react';

import { withAuthenticator, Authenticator } from 'aws-amplify-react'

import signUpConfig from '../config/signUpConfig'

import RoomForm from '../component/RoomForm';

class App extends Component {
  render() {
    return (
      <Fragment>
        <header className='App-header auth'>
          <Authenticator usernameAttributes='email' />
        </header>
        <div className='App-body'>
          <RoomForm room_id={this.props.match.params.room_id} />
        </div>
      </Fragment>
    );
  }
}

export default withAuthenticator(App, { usernameAttributes: 'email', signUpConfig });
