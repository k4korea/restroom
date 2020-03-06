import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import RoomItem from './RoomItem';

class App extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    this.getRooms();
    this.intervalId = setInterval(this.getRooms.bind(this), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getRooms = async () => {
    const res = await API.get('rooms', '/items/');
    if (res && res.length > 0) {
      this.reloaded(res);
    }
  }

  reloaded(res) {
    let items = res.sort(this.compare).reverse();

    console.log(items)

    this.setState({ items: items });
  }

  compare(a, b) {
    let a1 = a.latest;
    let b1 = b.latest;
    if (a1 < b1) {
      return -1;
    } else if (a1 > b1) {
      return 1;
    }
    return 0;
  }

  render() {
    const list = this.state.items.map(
      (item, index) => (<RoomItem key={index} item={item} pathPrefix={this.props.pathPrefix} />)
    );

    return (
      <Fragment>
        <div className='lb-items'>
          {list}
        </div>
      </Fragment>
    );
  }
}

export default App;
