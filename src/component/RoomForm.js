import React, { Component, Fragment } from 'react';

import { API } from 'aws-amplify'

import Popup from './Popup';

class App extends Component {
  constructor(props) {
    super(props);

    this.popupCmp = React.createRef();

    this.getUser();
  }

  state = {
    room_name_class: 'text_normal width_80',
    room_name: '',
    real_name_class: 'text_normal width_80',
    real_name: '',
    image_url: '/avatar.png',
  }

  getUser = async () => {
    console.log(`getUser: ${this.props.room_id}`);

    if (!this.props.room_id) {
      return;
    }

    const res = await API.get('rooms', `/items/object/${this.props.room_id}`);

    console.log(`getUser: ${JSON.stringify(res, null, 2)}`);

    if (res && res.room_id) {
      this.setState({
        room_name: res.room_name,
        real_name: res.real_name,
        image_url: res.image_url,
      });

      this.validateAll();
    }
  };

  postUser = async () => {
    console.log('postUser');

    try {
      let body = {
        room_id: this.props.room_id,
        room_name: this.state.room_name,
        real_name: this.state.real_name,
      };

      console.log(`postUser: ${JSON.stringify(body, null, 2)}`);

      const res = await API.put('rooms', '/items', {
        body: body
      });

      console.log(`postUser: ${JSON.stringify(res, null, 2)}`);

      // this.popup('Saved!');
      this.popupCmp.current.start(3000, 'Saved!');

      // this.props.history.push('/');

    } catch (err) {
      console.log(`postUser: ${JSON.stringify(err, null, 2)}`);

      // this.popup(err.message);
      this.popupCmp.current.start(3000, err.message);
    }
  };

  validateString(val) {
    var re = /^([a-z][a-z0-9-_]{3,19})$/g;
    return re.test(val);
  }

  getClassValue(b, v) {
    if (b) {
      return `text_normal ${v}`;
    } else {
      return `text_red ${v}`;
    }
  }

  validateTitle(v) {
    let b = (v !== '');
    this.setState({
      title_class: this.getClassValue(b, 'width_80'),
    });
    return b;
  }

  validateAll() {
    let b = this.validateTitle(this.state.room_name);
    b = this.validateTitle(this.state.real_name) && b;
    return b;
  }

  validate(k, v) {
    let b = false;

    switch (k) {
      case 'room_name':
        b = this.validateTitle(v);
        break;
      case 'real_name':
        b = this.validateTitle(v);
        break;
      default:
    }

    return b;
  }

  handleChange = (e) => {
    let v = e.target.value;

    this.setState({
      [e.target.name]: v,
    });

    this.validate(e.target.name, v);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validateAll()) {
      return;
    }

    this.postUser();
  }

  render() {
    return (
      <Fragment>
        <div className='logo'>
          <img id='logo' alt='deepracer' src={this.state.image_url} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='lb-submit'>
            <div className='lb-row'>
              <div>Username</div>
              <div>
                <input type='text' name='room_name' value={this.state.room_name} onChange={this.handleChange} className={this.state.room_name_class} placeholder='' autoComplete='off' maxLength='64' />
              </div>
            </div>
            <div className='lb-row'>
              <div>Realname</div>
              <div>
                <input type='text' name='real_name' value={this.state.real_name} onChange={this.handleChange} className={this.state.real_name_class} placeholder='' autoComplete='off' maxLength='64' />
              </div>
            </div>
            <div className='lb-row'>
              <div></div>
              <div><button type='submit' className='btn-submit'>Save</button></div>
            </div>
          </div>
        </form>

        <Popup ref={this.popupCmp} />
      </Fragment>
    );
  }
}

export default App;
