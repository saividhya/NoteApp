import React, { PropTypes } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText,Row,Col,Jumbotron,ListGroupItem,ListGroup,CardLink } from 'reactstrap';

class Note extends React.Component {
  render () {
    return (
      <div>
      <Row>
          <Col xs="6" sm="4">
            <Card>
              <CardBody>
                <CardTitle>Epaxos</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                <CardLink href="#">Card Link</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6" sm="4">
            <Card>
              <CardBody>
                <CardTitle>Raft</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                <CardLink href="#">Card Link</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col sm="4">
            <Card>
              <CardBody>
                <CardTitle>Election Algo</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                <CardLink href="#">Card Link</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
          </Col>
        </Row>



      </div>
    )

  }
}



class Category extends React.Component {
  render () {
    return(
      <div>
        <h3> Category </h3><br/>
        <ListGroup>
          <ListGroupItem>Cras justo odio</ListGroupItem>
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
  render () {
    return(
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
      <Row>
        <Col xs="3">
          <Category/>
        </Col>
        <Col>
          <Note/>
        </Col>
      </Row>


      </Jumbotron>
    )
  }
}

export default Dashboard;
