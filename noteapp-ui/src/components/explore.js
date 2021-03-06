import React from 'react'
import { Row,Col,Jumbotron } from 'reactstrap';
import {Notes} from './util.js'
import data from './data/dashboard.json'
import {getRecommendation} from './api.js'
import Cookies from 'universal-cookie';

class Explore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes:[],
      recommendNotes:[],
      pinnedNotes:[],
      category:[],

    }
  }


  componentWillMount() {

    getRecommendation().then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              console.log(data);
              this.setState({notes:data})

              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })
  }

  render () {
    let notes=this.state.notes
    const cookies = new Cookies();
    if (cookies.get("email")) {
      return(
        <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <h2>Explore</h2>
          <br/>
        <Row>
          <Col>
            <Notes notes={notes}/>
          </Col>
        </Row>


      </Jumbotron >
      )
    }
    else {
      window.location="/login"
    }

  }
}

export default Explore;
