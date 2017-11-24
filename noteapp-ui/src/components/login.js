import React from 'react'
import { Container,Jumbotron,Col,Row, Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import {TextComponent,PasswordComponent} from './util.js'
import { instanceOf } from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
//import {getToken,postLoginHistory} from './api.js'
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

export class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password:"",
      errors: {}
  }


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }


  handleChange(id,value) {
    let stateValue={};
    stateValue[id]=value;
    this.setState(stateValue);
  }

  validateSubmit() {
    var errors = {}
    if(this.state.email === "") {
      errors.userName = "User Name is required";
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
    let email= this.state.email
    let password=this.state.password
    // getToken(userName,password).then( (response) => {
    //   if(response.ok) {
    //     response.json().then(json=> {
    //       const { cookies } = this.props;
    //       cookies.set('id', json.token, { path: '/' });
    //       console.log(  cookies.get('id'))
    //       postLoginHistory("LOGIN",cookies.get('id')).then((response) => {
    //         console.log(response.json());
    //         window.location='/profile'
    //       }).catch (function (error) {
    //           console.log('Request failed', error);
    //       })
    //
    //     }
    //
    //       )
    //
    //     }
    // }).then((response) => {
    //
    // })
    // .catch (function (error) {
    //     console.log('Request failed', error);
    // });
  //  console.log(userName+" "+password)

    }

  render () {
    return(
      <Container>
      <Jumbotron style={{backgroundColor: '#FFFFFF'}}>
        <h1 className="text-center">Login</h1>
      </Jumbotron>

          <Form onSubmit={this.handleSubmit}>
            <TextComponent holder="Enter Email" value={this.state.email} id="email" label="Email" onChange={this.handleChange} errors={this.state.errors.email}/>
            <PasswordComponent holder="Enter password" value={this.state.password} id="password" label="password" onChange={this.handleChange} errors={this.state.errors.password}/>
            <Row>
              <Col/>
              <Col/>
              <Col/>
              <Col>
                <p className="text-right"><Button style={{backgroundColor: '#8A2BE2'}} type="submit" value="Login">Login</Button></p>
              </Col>
            </Row>
          </Form>

      </Container>)
  }
}

export default withCookies(Login);
