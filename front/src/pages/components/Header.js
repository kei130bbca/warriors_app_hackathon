import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function Header(props) {
    return (
        <header>
            {/* <div className="hero is-primary is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1>{props.title}</h1>
                    </div>
                </div>
            </div> */}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href={props.path}>
                    {props.title}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/influencerpersonal">Influencer Personal Page</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;