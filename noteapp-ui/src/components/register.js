import React from 'react'
import { Container,Jumbotron,Col,Row, Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import {TextComponent,PasswordComponent} from './util.js'
import { instanceOf } from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import {postUser,getToken,postLoginHistory} from './api.js'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import TagsInput from 'react-tagsinput'
import '../static/css/react-tagsinput.css'
import {Autocomplete} from './util.js'
import {register} from './api.js'

export class Register extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email:"",
      password:"",
      errors: {},
      tags: []
  }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }


  handleChange(id,value) {
    let stateValue={};
    stateValue[id]=value;
    this.setState(stateValue);
  }

  handleTagChange(tags) {
    //console.log(tags)
    this.setState({tags})
  }


  validateSubmit() {
    var errors = {}
    if(this.state.email === "") {
      errors.email = "Email is required";
    }
    if(this.state.password === "") {
      errors.password = "password is required";
    }

    //if("undefined"  === typeof this.state.data[response]) {
    //    errors.userName = "User Name is not valid"
    //}
    return errors;
  }

  handleSubmit(event) {
    event.preventDefault();
    var errors = this.validateSubmit();
    if(Object.keys(errors).length !== 0) {
      this.setState({
        errors: errors
      });
      return;
    }
    let password=this.state.password
    let email=this.state.email
    let tags= this.state.tags
    console.log(tags)
    register(email,password,tags).then( (response) => {
      if(response.ok) {
         window.location='/login'
      }



    }).catch (function (error) {
        console.log('Request failed', error);
      })


  

    }

  render () {
    // <TagsInput style={{color: '#FFFFFF'}} value={this.state.tags}
    // onChange={this.handleTagChange} />
    return(
      <Container>
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
        <h1 className="text-center">Register</h1>
      </Jumbotron>

          <Form onSubmit={this.handleSubmit}>
            <TextComponent holder="Enter email" value={this.state.email} id="email" label="Email" onChange={this.handleChange} errors={this.state.errors.email}/>
            <PasswordComponent holder="Enter password" value={this.state.password} id="password" label="password" onChange={this.handleChange} errors={this.state.errors.password}/>
            <Autocomplete tags={this.state.tags} onChange={this.handleTagChange}/>
            <Jumbotron style={{backgroundColor: '#FFFFFF'}}>

              <br/>
              <Row>
                <Col/>
                <Col/>
                <Col/>
                <Col>
                  <p className="text-right"><Button style={{backgroundColor: '#8A2BE2'}}  type="submit" value="Register">Register</Button></p>
                </Col>
              </Row>
            </Jumbotron>
          </Form>

      </Container>)
  }
}

export default withCookies(Register);
