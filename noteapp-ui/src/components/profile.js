import React, { PropTypes } from 'react'
import { Container,Jumbotron,Button,Col,Row} from 'reactstrap';
import {Autocomplete} from './util.js'
import {getTags} from './api.js'
import Cookies from 'universal-cookie';

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
  componentWillMount() {
    getTags().then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              //console.log(data)
              var arr= data.map(x=> x.name)
              this.setState({tags:arr})
              // this.setState({recommendNotes:data.myNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })

  }

  handleClick() {

  }

  render () {
    const cookies = new Cookies();
    if (cookies.get("email")) {
      return(

        <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
            <p className="text-right"><Button style={{backgroundColor: '#8A2BE2'}}
              type="submit" value="save" onClick={this.handleClick}>Save</Button></p>
          </Col>
          </Row>
              <Autocomplete tags={this.state.tags} onChange={this.handleTagChange}/>

        </Jumbotron>
      )
    }
    else {
      window.location="/login"
    }
  }
}

export default Profile;
