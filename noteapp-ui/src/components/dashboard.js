import React from 'react'
import { Row,Col,Jumbotron,ListGroupItem,ListGroup,Button, Label} from 'reactstrap';
import data from './data/dashboard.json'
import {Notes} from './util.js'
import Recommender from './recommender.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getNotes,getTags,getNotesForTag,
  getContentRecommendation} from './api.js'
import Cookies from 'universal-cookie';

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
        <p style={{fontSize: '1.3em'}}> Category </p><br/>
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
      pinnedNotes:[],
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

                this.setState({pinnedNotes:data.pinnedNotes})
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
              //this.setState({recommendNotes:data.myNotes})
              this.setState({pinnedNotes:data.pinnedNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })


      getContentRecommendation().then( (response) =>
      {
          if(response.ok) {
            response.json().then(
              data => {
                console.log(data)
                this.setState({recommendNotes:data})

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
    const cookies = new Cookies();
    if (cookies.get("email")) {
      return(
        <div>
          <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
            <Recommender notes={this.state.recommendNotes}/>
          </Jumbotron >
          <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
            <div>
              <span style={{fontSize: '1.7em'}}>
                All Yours
              </span>
              <span style={{float: 'right'}}>
                <a href="/create" to="/create"><Button style={{backgroundColor: '#8A2BE2'}}
                type="submit" value="Create">Create</Button></a>
              </span>
            </div>

            <br/>
            <Row>
              <Col xs="3">
                <Category category={this.state.category} onClick={this.handleClick}/>
              </Col>
              <Col>

                  <Label style={{textAlign: 'center'}} for="pinned" sm={12}>Your Pinned Notes</Label>
                  <Notes id="pinned" pinned={true} notes={this.state.pinnedNotes}/>


                  <Label style={{textAlign: 'center'}} for={this.props.id} sm={12}>Your Notes</Label>
                  <Notes notes={this.state.notes}/>

              </Col>
            </Row>
          </Jumbotron >
        </div>
        )
    }
    else {
      window.location="/login"
    }



  }
}

export default Dashboard;
