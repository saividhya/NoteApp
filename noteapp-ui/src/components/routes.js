import React from 'react';
import Dashboard from './dashboard.js'

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

      </div>
      </Router>
    )

  }
}

export default Routes;
