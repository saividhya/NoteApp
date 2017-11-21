import React from 'react'
import { Row,Col,Jumbotron } from 'reactstrap';
import {Notes} from './util.js'
import data from './data/dashboard.json'

class Explore extends React.Component {

  componentWillMount() {
    this.setState({notes:data})

  }

  render () {
    return(
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
        <h2>Explore</h2>
        <br/>
      <Row>
        <Col>
          <Notes notes={this.state.notes}/>
        </Col>
      </Row>


    </Jumbotron >
    )
  }
}

export default Explore;
