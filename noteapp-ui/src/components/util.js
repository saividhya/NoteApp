import React, { PropTypes } from 'react'
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText,Row,Col,Jumbotron,ListGroupItem,ListGroup,CardLink } from 'reactstrap';

export class Notes extends React.Component {
  render () {
    return (
      <div>
      <Row>
        {this.props.notes.map(row=>
          <Col key={row._id} xs="6" sm="4">
            <Card>
              <CardBody>
                <CardTitle>{row.title}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{row.content}</CardText>
                <CardLink href={"notes/"+row._id} to={"notes/"+row._id}>View</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
            <p></p>
          </Col>
        )}
        </Row>
      </div>
    )
  }
}
