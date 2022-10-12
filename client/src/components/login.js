import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Collapse, Container, Navbar, NavLink, Nav, NavbarBrand, 
    NavbarToggler, NavItem, UncontrolledDropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, NavbarText, UncontrolledCarousel, Media,
    Modal, ModalFooter, Button, ModalHeader, ModalBody, Form, FormGroup, Input, Label} 
from 'reactstrap'; 
import One from './1.jpg';
import Two from './2.jpg';
import Three from './3.jpg';
import Foot from './Footer';
import Navb from './Navbar';
import { Navigate } from 'react-router-dom';

function Login(props) {
    
    const [isModelOpen, setModalOpen] = useState(false);
    const [isModel2Open, setModal2Open] = useState(false);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [redirect, setredirect] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            setredirect(false);
        }
        else {
            setredirect(true);
            props.setuser(localStorage.getItem('username'));
            
        }
    })

    function toggleModal(props) {
        setModalOpen(!isModelOpen);
    }
    
    function toggleModal2() {
        setModal2Open(!isModel2Open);
    }

    function login(event) {
        var rating = -1;
        fetch("https://codeforces.com/api/user.info?handles=" + username.value)
        .then((res) => res.json())
        .then((res) => {
            var result = res.result[0];
            rating = result.rating;
            console.log(rating);
            axios.post("https://zenseprojectcodecase.herokuapp.com/users/updrating", {
                username : username.value,
                rating: rating
            })
            .then(
                (res) => {
                    console.log(res);
                    axios.post('https://zenseprojectcodecase.herokuapp.com/users/login', {
                        username: username.value,
                        password: password.value,
                        rating: rating
                    })
                    .then(function (response) {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('username', username.value);
                        setredirect(true);
                    })
                    .catch(function (error) {
                        alert("Invalid Credentials!");
                        console.log(error);
                        setredirect(false);
                    });
                },
                (err) => {
                    console.log(err);
                }
            )
            
        }, (err) => {
            axios.post('https://zenseprojectcodecase.herokuapp.com/users/login', {
                username: username.value,
                password: password.value,
                rating : -1
            })
            .then(function (response) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username.value);
                setredirect(true);
            })
            .catch(function (error) {
                alert("Invalid Credentials!");
                console.log(error);
                setredirect(false);
            });
            alert("Rating fetch failed, please try re-logging");
        })
        
        
        toggleModal();
        
        
    }

    function signup() {
        toggleModal2();
        axios.post('https://zenseprojectcodecase.herokuapp.com/users/signup', {
            username: username.value,
            password: password.value,
            firstname: firstname.value,
            lastname: lastname.value
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

   
    
    return (
        <div>
            {redirect ? <Navigate to="/dashboard"></Navigate> : null}
            <Modal isOpen={isModelOpen} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal} charCode="Y" className='modhead'>Login</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type='text' id='username' name='username' innerRef={(input) => setusername(input)} />
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor="password">Password</Label>
                            <Input type='password' id='password' name='password' innerRef={(input) => setpassword(input)} />
                        </FormGroup>
                    </Form>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' value="submit" onClick={login}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isModel2Open} toggle={toggleModal2} >
                <ModalHeader toggle={toggleModal2} charCode="Y">Sign Up</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="firstname">First Name</Label>
                            <Input type='text' id='firstname' name='firstname' innerRef={(input) => {
                                
                                setfirstname(input)
                            }} />
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor="lastname">Last Name</Label>
                            <Input type='text' id='lastname' name='lastname' innerRef={(input) => setlastname(input)} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">Username (Use your Codeforces username)</Label>
                            <Input type='text' id='username' name='username' innerRef={(input) => setusername(input)} />
                        </FormGroup>
                        <FormGroup>
                        <Label htmlFor="password">Password</Label>
                            <Input type='password' id='password' name='password' innerRef={(input) => setpassword(input)} />
                        </FormGroup>
                    </Form>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={signup}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggleModal2}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Navb/>
            <div className='jumbotron'>
                <div className='container '>
                    <div className='row mt-5'>
                        <div className='col-12 col-md-6 offset-md-3'>
                            <p className='logintext'>Welcome to CodeCase</p>
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
                                <button className='btn btn-lg btn-outline-light w-100' onClick={toggleModal}>
                                    Login
                                </button>
                            </div>
                            <div className='col-12 col-md-4 '>
                                <button className='btn btn-lg btn-outline-light btn-block w-100' onClick={toggleModal2}>
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
                                <h2 className='h1t2 h1t3'>Practice Weak Concept!</h2>
                            </div>
                            <div className='row'>
                                <div className='d-none d-md-block'>
                                    <p className='h1t1 mt-3 h1t3'> Practice your weak area! We provide option to generate 
                                    questions in the area you are weak in. Based on your failed submissions, questions are 
                                    from the area having maximum failed submission to area having minimum.
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