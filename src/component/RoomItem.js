import React, { Component, Fragment } from 'react';

class App extends Component {
  render() {
    // let href = `/rooms/${this.props.item.room_id}`;

    let diff = (Date.now() - this.props.item.latest) / 1000;

    let ball = <img alt='gray' src="/ball/gray.png" className="lb-ball" />;
    let latest = '-';

    if (this.props.item.available === 'x') {
      ball = <img alt='red' src="/ball/red.png" className="lb-ball" />;
    } else if (this.props.item.available === 'o') {
      ball = <img alt='green' src="/ball/green.png" className="lb-ball" />;

      if (diff < 60) {
        latest = parseInt(diff) + '초 전';
      } else if (diff < 60 * 60) {
        latest = parseInt(diff / 60) + '분 전';
      } else if (diff < 60 * 60 * 24) {
        latest = parseInt(diff / (60 * 60)) + '시간 전';
      } else {
        latest = parseInt(diff / (60 * 60 * 24)) + '일 전';
      }
    }

    if (diff > (60 * 60 * 24)) {
      ball = <img alt='gray' src="/ball/gray.png" className="lb-ball" />;
      latest = '-';
    }

    if (this.props.mode === 'dist') {
      latest += ` (${this.props.item.distance})`;
    }

    return (
      <Fragment>
        <div className='lb-row'>
          <div>{this.props.item.room_id}</div>
          <div>{ball}</div>
          <div>{latest}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
