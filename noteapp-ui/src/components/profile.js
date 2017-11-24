import React, { PropTypes } from 'react'
import { Container,Jumbotron} from 'reactstrap';
import {Autocomplete} from './util.js'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleTagChange(tags) {
    //console.log(tags)
    this.setState({tags})
  }

  render () {
    return(
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
            <Autocomplete tags={this.state.tags} onChange={this.handleTagChange}/>
      </Jumbotron>
    )
  }
}

export default Profile;
