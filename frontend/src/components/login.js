import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Collapse, Container, Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText} from 'reactstrap'; 

function Login() {
    
    const [isOpen, setisOpen] = useState(false);

    function toggle() {
        setisOpen(!isOpen);
    }

    return (
        <div>
            <div>
            <Navbar color='light' light expand="md">
                <NavbarBrand href='/'>Title</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem >
                            <NavbarText>Component 1</NavbarText>
                        </NavItem>
                        <NavItem >
                            <NavbarText>Component 2</NavbarText>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className='col col-12 col-md-4'>
                            <DropdownToggle nav caret right>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            </div>
            
            <div className='jumbotron'>
            <Container fluid>
                <h1 className="display-3">Fluid jumbotron</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </Container>
            </div>
        </div>
    )
}

export default Login;