import React, { useState } from 'react';

import {
    Collapse, Container, Navbar, NavLink, Nav, NavbarBrand, 
    NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, NavbarText, UncontrolledCarousel} 
from 'reactstrap'; 

function Login() {
    
    const [isOpen, setisOpen] = useState(false);

    function toggle() {
        setisOpen(!isOpen);
    }

    return (
        <div>
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
            
            <div className='jumbotron'>
                <div className='container '>
                    <div className='row mt-5'>
                        <div className='col-12 col-md-6 offset-md-3'>
                            <p className='logintext'>Welcome to Title</p>
                        </div>
                        <div className='row mt-5'>
                            <div className='col-12 col-md-6 offset-md-3'>
                                <p className='logintext1'> Success is not Final; <br /> 
                                    Failure is not Fatal; <br/> It is the courage to continue; <br/> that count. <br/>
                                </p>
                            </div>
                        </div>
                        <div className='row gx-5 mt-10 mt-8'>
                            <div className='col-12 col-md-4 offset-md-2'>
                                <button className='btn btn-lg btn-outline-light w-100'>
                                    Login
                                </button>
                            </div>
                            <div className='col-12 col-md-4 '>
                                <button className='btn btn-lg btn-outline-light btn-block w-100'>
                                    SignUp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;