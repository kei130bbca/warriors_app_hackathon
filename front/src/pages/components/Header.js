import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function Header(props) {
    const NavLinkArray = [
        <Nav.Link href="/" key="home">
            Home
        </Nav.Link>,
    ];
    const token = localStorage.getItem('token');
    if (token) {
        const user_id = localStorage.getItem('user_id');
        const url = `/influencerpersonal/${user_id}`
        NavLinkArray.push(
            <Nav.Link href={url} key="influencerpersonal">
                Personal page
            </Nav.Link>);
    }
    return (
        <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href={props.path} onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_id');
                    }}>
                    {/* {props.title} */}
                    Rakuten Recommend
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
