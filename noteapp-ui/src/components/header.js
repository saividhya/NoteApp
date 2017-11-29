import React from 'react';
import { instanceOf } from 'prop-types';
import { Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem, NavLink, Input,Button } from 'reactstrap';
import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import {logout} from './api.js'
import { TextComponent } from './util';

class Header extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const { cookies } = this.props;
    //console.log(cookies.get('session'))
    this.state = {
      collapsed: true,
      id: cookies.get('email'),
      query:""
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleClick(event) {
    const { cookies } = this.props;
     logout().then( (response) => {
        if(response.ok) {
          this.setState({id:cookies.remove('email')})
          window.location="/"
        }
     }).catch (function (error) {
         console.log('Request failed', error);
       })

  }

  handleChange(event) {
    let stateValue={};
    stateValue[event.target.id]=event.target.value;
    console.log()
    this.setState(stateValue);
  }

  render() {

    //#8e36f4
    let query=this.state.query
    //console.log(query)
    return (
      <div>
          <Navbar color="dark" dark expand>
          <NavbarBrand href="/" className="mr-auto">NoteApp</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/explore">Explore</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Profile">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Stats">Stats</NavLink>
            </NavItem>
          </Nav>
          <Input style={{border: 'none'}}
            placeholder="text search"
            value={this.state.query} id="query" onChange={this.handleChange}/>
          <a href={"/search/"+query} to={"/search/"+query}>
            <Button style={{backgroundColor: '#5D6D7E'}}  type="submit"
            value="Search" >
            Search</Button></a>
        </Collapse>

          {
            "undefined"  === typeof this.state.id?
                  <Nav className="ml-auto" navbar>
                    <NavItem><NavLink href="/login">Login</NavLink></NavItem>
                    <NavItem><NavLink href="/Register">Register</NavLink></NavItem>
                  </Nav>:
                    <Nav className="ml-auto" navbar>
                      <NavItem><a className="nav-link" href="#" onClick={this.handleClick}>Logout</a> </NavItem>
                    </Nav>
          }
        </Navbar>
      </div>
    );
  }
}

export default withCookies(Header);
