import React, { useState } from 'react';

import {
    Collapse, Container, Navbar, NavLink, Nav, NavbarBrand, 
    NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, NavbarText, UncontrolledCarousel, Media} 
from 'reactstrap'; 

function Navb() {
    const [isOpen, setisOpen] = useState(false);

    function toggle() {
        setisOpen(!isOpen);
    }
    return (
        <div>
        <Navbar color='dark' dark expand="md" >
            <NavbarBrand href='/'>Title</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className='navv me-auto' navbar>
                    <NavItem>
                        <NavLink href='#'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='#'>About Us</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href='#'>Contact Us</NavLink>
                    </NavItem>
                    
                </Nav>
                <NavbarText className='navit'>FeedBack</NavbarText>
            </Collapse>
        </Navbar>
    </div>
    )
   
}

export default Navb;