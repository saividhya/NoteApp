import React from 'react';
import { instanceOf } from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Input } from 'reactstrap';
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
    const { cookies } = this.props;
    //console.log(cookies.get('session'))
    this.state = {
      collapsed: true,
      id: cookies.get('email')
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
  render() {

    //#8e36f4
    return (
      <div>
        <Navbar style={{backgroundColor: '#8A2BE2'}} dark toggleable>
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
          </Nav>
          <Input style={{border: 'none'}} placeholder="full text search query" value={this.state.query} id="search" onChange={this.handleChange}/>
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
