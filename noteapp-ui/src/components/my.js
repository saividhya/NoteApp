import React from 'react'
import PropTypes from 'prop-types'
import CircularProgressbar from 'react-circular-progressbar';
import '../static/css/circularprogress.css'
import { Row,Jumbotron,Col,FormGroup,Label,Input} from 'reactstrap';
import {getTags} from './api.js'

export class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.id,event.target.value)
  }
  render () {
    return(
      <FormGroup row>
        <Label for={this.props.id} sm={2}>{this.props.label}</Label>
        <Col sm={10}>
          <Input type="select" name={this.props.id} id={this.props.id} value={this.props.value} onChange={this.handleChange}>
            <option id="" value=""></option>
            {this.props.options.map(option =>
              <option key={option.name} id={option.name} value={option.name}>{option.name}</option>)}
          </Input>
        </Col>
      </FormGroup>
    )

  }
}

class My extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag:"",
      tagItems:[],
      data:[
        {
          "author":"kili",
          "score":70.
        },
        {
          "author":"Vidhya",
          "score":20
        },
        {
          "author":"Kasi",
          "score":10
        },



      ],
    }
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(id,value) {
    let stateValue={};
    stateValue[id]=value;
    this.setState(stateValue);
  }

  componentWillMount() {
    getTags().then( (response) =>
    {
        if(response.ok) {
          response.json().then(
            data => {
              console.log(data)
              this.setState({tagItems:data})
              // this.setState({recommendNotes:data.myNotes})
              //console.log(data.myNotes);

              })
        }
      }).catch (function (error) {
          console.log('Request failed', error);
        })
  }

  render () {
    let data=this.state.data
    return (
      <Jumbotron  style={{backgroundColor: '#FFFFFF'}}>
      <SelectComponent id="tag" value={this.state.tag} label="Tag"
        options={this.state.tagItems} onChange={this.handleChange}/>
        <br/>
        <Row>

          {
            data.map(x =>
              <Col key={x.author} xs="6" sm="4">
                <div style={{height:"160px", width:"160px"}}>
                  <CircularProgressbar percentage={x.score} textForPercentage={
                    (pct) => `${x.author}`
                } />
                </div>
              </Col>
              )
          }


        </Row>
      </Jumbotron>
    )
  }
}

export default My;
