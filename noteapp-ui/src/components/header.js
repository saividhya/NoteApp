import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
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
              <NavLink href="/notification">Notification</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Profile">Profile</NavLink>
            </NavItem>
          </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
