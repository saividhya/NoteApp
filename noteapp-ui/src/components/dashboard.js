import React from 'react'
import { Row,Col,Jumbotron,ListGroupItem,ListGroup,Button} from 'reactstrap';
import data from './data/dashboard.json'
import {Notes} from './util.js'
import Recommender from './recommender.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getNotes,getTags,getNotesForTag} from './api.js'

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //console.log(event.target)
    this.props.onClick(event.target.name)
  }

  render () {
    //console.log(this.props.category)
    return(
      <div>
        <h3> Category </h3><br/>
        <ListGroup>
          {
            <ListGroupItem tag="a" name="all"
              onClick={this.handleClick}
              style={{color: '#007bff', cursor:'pointer'}}>All</ListGroupItem>
          }
          {

            this.props.category.map(row=>
              <ListGroupItem key={row.name} tag="a" name={row.name}
                onClick={this.handleClick}
                style={{color: '#007bff', cursor:'pointer'}}>{row.name}</ListGroupItem>
            )
          }

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
      recommendNotes:[],
      category:[],

    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(tagName) {
    //console.log(tagName)
    if(tagName==="all") {
      getNotes().then( (response) =>
      {
          if(response.ok) {
            response.json().then(
              data => {
                this.setState({notes:data.myNotes})
                this.setState({recommendNotes:data.myNotes})
                //console.log(data.myNotes);

                })
          }
        }).catch (function (error) {
            console.log('Request failed', error);
          })
    }
    else {
      getNotesForTag(tagName).then( (response) =>
      {
          console.log(tagName)
          if(response.ok) {
            response.json().then(
              data => {
                console.log(data)
                this.setState({notes:data.myNotes})
                //console.log(data.myNotes);

                })
          }
        }).catch (function (error) {
            console.log('Request failed', error);
          })
    }


  }

  componentWillMount() {

    getNotes().then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              this.setState({notes:data.myNotes})
              this.setState({recommendNotes:data.myNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })



      getTags().then( (response) =>
      {
          if(response.ok) {
            response.json().then(
              data => {
                //console.log(data)
                this.setState({category:data})
                // this.setState({recommendNotes:data.myNotes})
                //console.log(data.myNotes);

                })
          }
        }).catch (function (error) {
            console.log('Request failed', error);
          })


  }


  render () {
    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <Recommender notes={this.state.recommendNotes}/>
        </Jumbotron >
        <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
          <Row>
            <Col>
              <h2>Dashboard</h2>
            </Col>
            <Col>
              <p className="text-right">
                <a href="/create" to="/create"><Button style={{backgroundColor: '#8A2BE2'}}
                  type="submit" value="Create">Create</Button></a></p>
            </Col>
          </Row>

          <br/>
          <Row>
            <Col xs="3">
              <Category category={this.state.category} onClick={this.handleClick}/>
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
