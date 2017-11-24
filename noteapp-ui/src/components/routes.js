import React from 'react';
import Dashboard from './dashboard.js'
import Explore from './explore.js'
import Notification from './notification.js'
import Profile from './profile.js'
import Note from './note.js'
import Login from './login.js'
import Register from './register.js'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class Routes extends React.Component {
  render () {
    return (
      <Router>
      <div>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/explore" component={Explore}/>
          <Route exact path="/notification" component={Notification}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/notes/:id" component={Note}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
      </div>
      </Router>
    )

  }
}

export default Routes;
