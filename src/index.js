import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

import AppProvider from './context/AppProvider'

import App from './App';
import Rooms from './pages/Rooms'
import Room from './pages/Room'

import Amplify, { Analytics } from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Analytics.record('Page_Load');
Analytics.autoTrack('pageView', {
    enable: true,
    type: 'SPA'
})

const routing = (
    <AppProvider>
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/rooms/' component={Rooms} />
                <Route path='/rooms/:room_id' component={Room} />
                <Route component={App} />
            </Switch>
        </Router>
    </AppProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
