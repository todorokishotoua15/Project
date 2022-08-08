import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, ModalHeader } from 'reactstrap';
import Navb2 from "./Navbar2";
import Foot from "./Footer";

function PracticeProblems(props) {
    const [rating, setrating] = useState(-1);
    const [isModel1Open, setisModel1Open] = useState(false);
    const [numprob, setnumprob] = useState(0);
    const [warmprob, setwarmprob] = useState(0);
    const[redir, setredir] = useState(false);

    useEffect(() => {
        if (rating === -1) {
            fetch("https://codeforces.com/api/user.info?handles=" + localStorage.getItem('username'))
            .then((res) => res.json())
            .then(
                (res) => {
                    setrating(res.result[0].rating);
                },
                (err) => {
                    console.log("uhh ohh", err);
                }
            )
        }
    })

    function toggleModal1() {
        setisModel1Open(!isModel1Open);
    }

    function handleClick() {
        setisModel1Open(!isModel1Open);
        console.log(warmprob.value, numprob.value);
    }

    return (
        <div>
            <Navb2 redir={redir} setredir={setredir}/>
            <Modal isOpen={isModel1Open} toggle={toggleModal1} >
                <ModalHeader toggle={toggleModal1} charCode="Y" className='modhead'>Practice Problems!</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="select">Select Number of Problems</Label>
                            <Input type="select" name="select" id="select" innerRef={(inp) => setnumprob(inp)}>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="select">Select Number of Warmup Questions</Label>
                            <Input type="select" name="select" id="select" innerRef={(inp) => setwarmprob(inp)}>
                                <option>1</option>
                                <option>2</option>
                            </Input>
                        </FormGroup>
                    </Form>             
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' value="submit" onClick={handleClick} >Generate Problems</Button>{' '}
                    <Button color="secondary" onClick={toggleModal1}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <div className="container">
                <div className="row mt-5">
                    <div className="col d-flex justify-content-center">
                        <h3 className="h1t1 h1t2 h1t3">
                            Welcome to practice problem section!
                        </h3>
                    </div>
                </div>
                <div className="row mt-2 row-content1">
                    <div className="col d-flex justify-content-center">
                        <p className="h1t1 h1t2 h1t3"> Based on your rating, random problems will
                            be generated. The question's rating will start around your own rating and 
                            will go upto +400/600 based on how much you select. You also have the option to 
                            select warmup problems (only upto 2) which consists of easy questions of rating 
                            800-1000 (div2 A and B).
                         </p>
                    </div>
                </div>
                <div className="row mt-5 mb-5 d-flex justify content-center">
                    <div className="col text-center">
                        <button className="btn btn-lg btn-dark" onClick={toggleModal1}>
                            Generate!
                        </button>
                    </div>
                </div>
            </div>
            <Foot/>
        </div>
    )
}

export default PracticeProblems;