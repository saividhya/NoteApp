import React from 'react'
import { Row,Col,Jumbotron,ListGroupItem,ListGroup} from 'reactstrap';
import data from './data/dashboard.json'
import {Notes} from './util.js'
import Recommender from './recommender.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Category extends React.Component {
  render () {
    return(
      <div>
        <h3> Category </h3><br/>
        <ListGroup>
          <ListGroupItem>fsafsagag</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}






class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notes:[],
      category:[],

    }

  }


  componentWillMount() {
    this.setState({notes:data})

  }


  render () {
    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <Recommender notes={this.state.notes}/>
        </Jumbotron >
        <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <h2>Dashboard</h2>
          <br/>
          <Row>
            <Col xs="3">
              <Category category={this.state.category}/>
            </Col>
            <Col>
              <Notes notes={this.state.notes}/>
            </Col>
          </Row>
        </Jumbotron >
      </div>

    )
  }
}

export default Dashboard;
