import React from 'react';
import Dashboard from './dashboard.js'
import Explore from './explore.js'
import Notification from './notification.js'
import Profile from './profile.js'
import Note from './note.js'

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
      </div>
      </Router>
    )

  }
}

export default Routes;
