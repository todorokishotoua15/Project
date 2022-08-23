import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, ModalHeader, Col, FormText } from 'reactstrap';
import axios from 'axios';
import Navb from "./Navbar";
import Foot from "./Footer";

function ContactUs() {
    const [redir, setredir] = useState(false);
    return (
        <div>
            <Navb redir={redir} setredir={setredir}/>
            <div className='jumbotron2'>
                <div className='container '>
                    
                </div>
            </div>
            <div className="container">
                <div className="row row-content1">
                
                    <div className="col d-flex justify-content-center">
                        <h1 className="h1t1">Contact Us!</h1>
                    </div>
                </div>
                
            </div>
            <div className="container">
            <div className="row mt-3 mb-3">
                <div className="col-12 col-md-8 offset-md-2 justify-content-center">
                <Form>
                    <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="exampleSelect" sm={2}>Query</Label>
                    <Col sm={10}>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>Complaint</option>
                            <option>FeedBack</option>
                            <option>Suggestion</option>
                        </Input>
                    </Col>
                    </FormGroup>
                    
                    <FormGroup row>
                    <Label for="exampleText" sm={2}>Type Your Query</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="text" id="exampleText" />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="exampleFile" sm={2}>Upload Image </Label>
                    <Col sm={10}>
                        <Input type="file" name="file" id="exampleFile" />
                        <FormText color="muted">
                        (if required)
                        </FormText>
                    </Col>
                    </FormGroup>
                    <FormGroup tag="fieldset" row>
                    <legend className="col-form-label col-sm-2">Do you want us to save email for communication?</legend>
                    <Col sm={10}>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio2" />{' '}
                            Yes
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio2" />{' '}
                            No
                        </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                        <Label check>
                            <Input type="radio" name="radio2" disabled />{' '}
                            Unsure
                        </Label>
                        </FormGroup>
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="checkbox2" sm={2}>Include Name?</Label>
                    <Col sm={{ size: 10 }}>
                        <FormGroup check>
                        <Label check>
                            <Input type="checkbox" id="checkbox2" />{' '}
                            yes/no
                        </Label>
                        </FormGroup>
                    </Col>
                    </FormGroup>
                    <FormGroup check row>
                    <Col sm={{ size: 5, offset: 5 }}>
                        <Button>Submit</Button>
                    </Col>
                    </FormGroup>
                </Form>
                </div>
            </div>
            </div>
            <Foot/>
        </div>
    )
}

export default ContactUs;