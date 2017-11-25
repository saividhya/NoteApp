import React  from 'react'
import { Card, CardBody,
  CardTitle, CardText,Row,Col,Jumbotron,CardLink,
Container,Form, FormGroup, Label, Input,Alert,CardDeck } from 'reactstrap';
import TagsInput from 'react-tagsinput'
import '../static/css/react-tagsinput.css'
import Autosuggest from 'react-autosuggest'
import Slider from 'react-slick'
import {getAllTags} from './api.js'

export class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.truncate = this.truncate.bind(this);
  }
  truncate(str,len) {
      if(str.length>len) {
        return str.substring(0,len)+'...';
      }
      else {
        return str
      }
  }
  render () {

    return (
      <div>


        <Row>
        {this.props.notes.map(row=>
          <Col key={row._id} xs="6" sm="4">
            <Card style={{borderStyle: "solid",borderWidth: "0px 4px 4px 0px"}}>
              <CardBody>
                <CardTitle style={{fontSize: '1.2em'}}>{this.truncate(row.title,15)}</CardTitle>
              </CardBody>
              <CardBody>
                <CardText>{this.truncate(row.content,40)}</CardText>
                <CardLink href={"notes/"+row._id} to={"notes/"+row._id}>View</CardLink>

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

export class RecommendNotes extends React.Component {
  constructor(props) {
    super(props);
    this.truncate = this.truncate.bind(this);
  }
  truncate(str,len) {
      if(str.length>len) {
        return str.substring(0,len)+'...';
      }
      else {
        return str
      }
  }
  render () {
    var settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };
    return (
      <Slider {...settings}>
        {this.props.notes.map(row=>
          <div key={row._id}>
            <Row>
              <Col xs="9" sm="10">
                <Card style={{borderStyle: "solid",borderWidth: "0px 4px 4px 0px"}}>
                  <CardBody>
                      <CardTitle style={{fontSize: '1.2em'}}>{this.truncate(row.title,15)}</CardTitle>
                  </CardBody>
                  <CardBody>
                    <CardText>{this.truncate(row.content,40)}</CardText>
                    <CardLink href={"notes/"+row._id} to={"notes/"+row._id}>View</CardLink>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Slider >
    )
  }
}


export class TextComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event.target.id,event.target.value);
  }

  render () {

    if("undefined"  === typeof this.props.errors) {
      return(
        <FormGroup row>
          <Label for={this.props.id} sm={2}>{this.props.label}</Label>
          <Col sm={10}>
            <Input type="text" name={this.props.id} id={this.props.id} placeholder={this.props.holder} value={this.props.value} onChange={this.handleChange}/>
            </Col>
        </FormGroup>
      )
    }
    return(
      <FormGroup row>
        <Label for={this.props.id} sm={2}>{this.props.label}</Label>
        <Col sm={10}>
          <Input type="text" name={this.props.id} id={this.props.id} placeholder={this.props.holder} value={this.props.value} onChange={this.handleChange}/>
          <Alert color="danger">
            {this.props.errors}
          </Alert>
          </Col>
      </FormGroup>
    )

  }
}

export class PasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.onChange(event.target.id,event.target.value);
  }

  render () {

    if("undefined"  === typeof this.props.errors) {
      return(
        <FormGroup row>
          <Label for={this.props.id} sm={2}>{this.props.label}</Label>
          <Col sm={10}>
            <Input type="password" name={this.props.id} id={this.props.id} placeholder={this.props.holder} value={this.props.value} onChange={this.handleChange}/>
            </Col>
        </FormGroup>
      )
    }
    return(
      <FormGroup row>
        <Label for={this.props.id} sm={2}>{this.props.label}</Label>
        <Col sm={10}>
          <Input type="password" name={this.props.id} id={this.props.id} placeholder={this.props.holder} value={this.props.value} onChange={this.handleChange}/>
          <Alert color="danger">
            {this.props.errors}
          </Alert>
          </Col>
      </FormGroup>
    )

  }
}


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
              <option key={option.objectId} id={option.objectId} value={option.objectName}>{option.objectName}</option>)}
          </Input>
        </Col>
      </FormGroup>
    )

  }
}



export class Autocomplete extends React.Component {

  constructor () {
    super()
    this.state = {
      autoSuggest: [

      ],

    }
    this.handleChange = this.handleChange.bind(this);
    this.render = this.render.bind(this);
  }

  handleChange (tags) {
    //console.log(tags)
    this.props.onChange(tags);
  }

 componentWillMount() {

   getAllTags().then( (response) =>
   {
       if(response.ok) {
         response.json().then(
           data => {
             //console.log(data)
             this.setState({autoSuggest:data})
             // this.setState({recommendNotes:data.myNotes})
             //console.log(data.myNotes);

             })
       }
     }).catch (function (error) {
         console.log('Request failed', error);
       })

  //  this.setState({
  //    autoSuggest: [
  //        {
  //         "name": "cvbrew",
  //         "normValue": 0.5
  //       },
  //       {
  //           "name": "htresvb",
  //           "normValue": 0.5
  //       }
  //    ]
  //  })
 }


  render () {
    let autoSuggest=this.state.autoSuggest
    function autocompleteRenderInput ({addTag, ...props}) {
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length

      let suggestions = autoSuggest.filter((state) => {
        return state.name.toLowerCase().slice(0, inputLength) === inputValue
      })

      return (
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
          inputProps={{...props, onChange: handleOnChange}}
          onSuggestionSelected={(e, {suggestion}) => {
            addTag(suggestion.name)
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      )
    }

    return <TagsInput renderInput={autocompleteRenderInput}
      value={this.props.tags} onChange={this.handleChange} />
  }
}
