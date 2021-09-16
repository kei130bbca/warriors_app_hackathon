import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header(props) {
  const NavLinkArray = [
    <Nav.Link href="/" key="home">
      Home
    </Nav.Link>,
  ];
  if (localStorage.getItem('token')) {
    NavLinkArray.push(
      <Nav.Link href="/influencerpersonal" key="influencerpersonal">
        Influencer Personal Page
      </Nav.Link>
    );
  }
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href={props.path}>
          {/* {props.title} */}
          Warriors app
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {NavLinkArray}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
