import React, { useState } from 'react';

import {
    Collapse, Container, Navbar, NavLink, Nav, NavbarBrand, 
    NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, NavbarText, UncontrolledCarousel, Media} 
from 'reactstrap'; 
import One from './1.jpg';
import Two from './2.jpg';
import Three from './3.jpg';
import Foot from './Footer';
function Login() {
    
    const [isOpen, setisOpen] = useState(false);

    function toggle() {
        setisOpen(!isOpen);
    }
    console.log(One);
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
            <div className='container'>
                <div className='row row-content'>
                    <div className='d-flex justify-content-center'>
                        <h1 className='h1t1'>What do we provide?</h1>
                    </div>
                    
                </div>
                <div className='row align-items-center mt-5'>
                    <div className='col-5 col-md-4 mt-5'>
                        <img src={One} className="i1 i2"/>
                    </div>
                    <div className='col-7'>
                        <div className='container'>
                            <div className='row'>
                                <h2 className='h1t2 h1t3'>Problems aimed to improve You!</h2>
                            </div>
                            <div className='row'>
                                <div className='d-none d-md-block'>
                                    <p className='h1t1 mt-3 h1t3'> We try to collect questions from codeforces that will be 
                                        best suited for your improvement. For this, lets say if your rating is 'x' 
                                        then questions are collected ranging from x-200 to upto x+400.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    
                </div>
                <div className='row  mt-8'>
                    <div className='col-7'>
                        <h2 className='h1t2 h1t3'>Auto-Made Custom Mashup Contests</h2>
                            <div className='d-none d-md-block'>
                                <p className='h1t1 mt-3 h1t3'> Several user register themselves for a mashup contest
                                    and based on average rating of the users participated, a problem list for a contest
                                    with suitable difficulty is made.
                                </p>                   
                        </div>
                    </div>
                    <div className='col-3 offset-1 offset-md-2 '>
                        <container>
                            <div className='row'>
                                <img src={Two} className="i3 i5 block"/>
                            </div>
                        </container>
                    </div>
                </div>
                <div className='row align-items-center mt-8'>
                    <div className='col-5 col-md-4 mt-5'>
                        <img src={Three} className="i2 i4 i6"/>
                    </div>
                    <div className='col-7'>
                        <div className='container'>
                            <div className='row'>
                                <h2 className='h1t2 h1t3'>Problems aimed to improve You!</h2>
                            </div>
                            <div className='row'>
                                <div className='d-none d-md-block'>
                                    <p className='h1t1 mt-3 h1t3'> We try to collect questions from codeforces that will be 
                                        best suited for your improvement. For this, lets say if your rating is 'x' 
                                        then questions are collected ranging from x-200 to upto x+400.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>
            <Foot />
        </div>
    )
}

export default Login;