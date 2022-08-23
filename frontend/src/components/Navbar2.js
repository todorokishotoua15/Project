import React, { useState } from 'react';
import { Navigate } from 'react-router';

import {
    Collapse, Container, Navbar, NavLink, Nav, NavbarBrand, 
    NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, NavbarText, UncontrolledCarousel, Media} 
from 'reactstrap'; 

function Navb2(props) {
    const [isOpen, setisOpen] = useState(false);

    function toggle() {
        setisOpen(!isOpen);
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        props.setredir(true);
    }

    return (
        <div>
            {props.redir ? <Navigate to="/"></Navigate> : null}
        <Navbar color='dark' dark expand="md" >
            <NavbarBrand href='/'>CodeCase</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className='navv me-auto' navbar>
                    <NavItem>
                        <NavLink href='/dashboard'>Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='/contactus'>Contact Us</NavLink>
                    </NavItem>

                </Nav>
                <NavItem>
                <NavbarText className='navit'>
                    <a href='#' className='a1' onClick={logout}>Logout</a>
                </NavbarText>
                </NavItem>
            </Collapse>
        </Navbar>
    </div>
    )
}

export default Navb2;