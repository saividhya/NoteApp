import React, { PropTypes } from 'react'
import { Container,Jumbotron} from 'reactstrap';
import {Autocomplete} from './util.js'

class Profile extends React.Component {
  render () {
    return(
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <Autocomplete/>
      </Jumbotron>
    )
  }
}

export default Profile;
