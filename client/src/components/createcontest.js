import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Navb2 from "./Navbar2";
import Foot from "./Footer";
import { queries } from "@testing-library/react";

function median(nums) {
    const sorted = Array.from(nums).sort((a,b) => a-b);
    const middle = Math.floor(sorted.length/2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function CreateContest(props) {
    const [redir, setredir] = useState(false);
    const [participants, setparticipants] = useState([]); 
    const [isModel1Open, setisModel1Open] = useState(false);
    const [curr, setcurr] = useState('');
    const [alluser, setalluser] = useState([]);
    const [allprob, setallprob] = useState([]);
    const [genques, setgenques] = useState([]);

    useEffect(() => {
        if (alluser.length === 0) {
            fetch("https://zenseprojectcodecase.herokuapp.com/users")
            .then((res) => res.json())
            .then(
                (res) => {
                    var temp = [];
                    for (var i = 0; i < res.length; i++) {
                        temp.push(res[i]);
                    }
                    console.log(temp);
                    setalluser(temp);
                    console.log(alluser);
                    
                },
                (err) => {
                    console.log(err);
                }
            )
        }
        if (allprob.length === 0) {
            fetch("https://codeforces.com/api/problemset.problems")
            .then((res) => res.json())
            .then (
                (res) => {
                    var temp = [];
                    for (var i = 0; i < res.result.problems.length; i++) {
                        var curr = res.result.problems[i];
                        var name = curr.name;
                        var rating = curr.rating;
                        var index = curr.index;
                        var contest = curr.contestId;

                        var obj = {
                            "name" : name,
                            "rating" : rating,
                            "index" : index,
                            "contest" : contest
                        }
                        
                        temp.push(obj);
                    }
                    console.log("temp", temp)
                    setallprob(temp);
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    })

    function toggleModal1() {
        setisModel1Open(!isModel1Open);
    }
    function handleClick() {
        var temp = participants;
        var found = false;
        var temp1;
        console.log(alluser);
        for (var i = 0; i < alluser.length; i++) {
            if (curr.value === alluser[i].username) {
                found = true;
                temp1 = alluser[i];
            }
        }

        if (!found) {
            alert("Not a valid user!");
        }
        else {
            temp.push(temp1);
        }
        setparticipants(temp);
        toggleModal1();
    }

    function RenderUser() {

        if (participants.length === 0) {
            return (
                null
            )
        }
        else {
            var count = 1;
            var users = participants.map((user) => {
                return (
                    <tr>
                        <th>{count++}</th>
                        <th>{user.firstname}</th>
                        <th>{user.lastname}</th>
                        <th>{user.username}</th>
                        <th>{user.rating}</th>
                    </tr>
                )
            })
            return (
                <div>
                    <div className="row d-flex justify-content-center align-items-center" >
                        <Table responsive hover bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users}
                            </tbody>
                        </Table>
                        <div className="col-12 text-center mt-5">
                            <button className="btn btn-lg btn-dark bbb1" onClick={Generate}>
                                Generate!
                            </button>
                        </div>
                    </div>
                    
                        
                    
                </div> 
            )
        }
    }

    function Generate() {
        var temp = [];
        for (var i = 0; i < participants.length; i++) {
            console.log(participants[i].rating);
            temp.push(participants[i].rating);
        }
        console.log(temp);
        var med = median(temp);

        shuffleArray(allprob);

        var easy = [];
        var ques = [];
        var del = 100;
        var base  = Math.round(med/100)*100;


        for (var i = 0; i < allprob.length; i++) {
            if (allprob[i].rating === 800) {
                if (easy.length < 2) {
                    easy.push(allprob[i]);
                }
            }
            if (allprob[i].rating === base) {
                if (ques.length < 6) {
                    ques.push(allprob[i]);
                    base += del;
                }
            }
        }

        var fin = easy;
        for (var i = 0; i < 6; i++) {
            fin.push(ques[i]);
        }

        setgenques(fin);
        console.log(med, fin);
    }

    function RenderQes() {
        if (genques.length === 0) {
            return (
                null
            )
        }
        else {
            var count = 1;
            const ques = genques.map((ques) => {
                return (
                    <tr>
                        <th>{count++}</th>
                        <th>{ques.name}</th>
                        <th>{ques.rating}</th>
                        <th>{ques.contest + ques.index}</th>
                    </tr>
                )
            })
            return (
                <div>
                    <Table responsive hover bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Question Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ques}
                        </tbody>
                    </Table>
                    <div className="row mt-5">
                        <h5 className="h1t1 h1t2 h1t3">
                            Go to <a className="a2" href="https://codeforces.com/mashup/new"> <p className="h1t1 h1t2 h1t3 mt-2">Create Mashup</p>
                            </a>
                            And in the add section enter the contestId given in fourth column to add the 
                            problems
                        </h5>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <Modal isOpen={isModel1Open} toggle={toggleModal1} >
                <ModalHeader toggle={toggleModal1} charCode="Y" className='modhead'>Practice Problems!</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="select">Username </Label>
                            <Input type="text" name="select" id="select" innerRef={(inp) => setcurr(inp)}>
                            </Input>
                        </FormGroup>
                    </Form>             
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' value="submit" onClick={handleClick}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggleModal1}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Navb2 redir={redir} setredir={setredir}/>
            <div className="container mt-5 mb-6">
                <div className="row">
                <div className="row mt-5">
                    <div className="col d-flex justify-content-center">
                        <h3 className="h1t1 h1t2 h1t3">
                            Welcome to Create Contest section!
                        </h3>
                    </div>
                </div>
                <div className="row mt-3 row-content1">
                    <div className="col d-flex justify-content-center">
                        <p className="h1t1 h1t2 h1t3"> Use the button to add users. If the 
                            user entered is not valid then it will not be added in the list.
                            It is necessary for the participants to have an account 
                            on this site
                         </p>
                    </div>
                </div>
                <div className="row mt-5 mb-5 d-flex justify content-center">
                    <div className="col text-center">
                        <button className="btn btn-lg btn-dark" onClick={toggleModal1}>
                            Add Users
                        </button>
                    </div>
                </div>
                </div>
                <div className="row">
                    <RenderUser />
                </div>
                <div className="row mt-5">
                    <RenderQes />
                </div>
            </div>
            <Foot/>
        </div>
    )
}

export default CreateContest;