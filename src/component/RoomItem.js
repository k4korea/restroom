import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    let href = `/rooms/${this.props.item.room_id}`;

    return (
      <Fragment>
        <div className='lb-row'>
          <div>{this.props.item.room_id}</div>
          <div>{this.props.item.available}</div>
          <div>{this.props.item.latest}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
