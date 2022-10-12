import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Navb2 from "./Navbar2";
import Foot from "./Footer";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function PracticeProblems(props) {
    const [rtg, setrating] = useState(-1);
    const [isModel1Open, setisModel1Open] = useState(false);
    const [numprob, setnumprob] = useState(0);
    const [warmprob, setwarmprob] = useState(0);
    const [redir, setredir] = useState(false);
    const [problist, setproblist] = useState([]);
    const [load, setload] = useState(0);
    const [allprob, setallprob] = useState([]);
    const [solvedprob, setsolvedprob] = useState([]);
    const [pendprob, setpendproblems] = useState(0);
    const[solved, setsolved] = useState([]);

    useEffect(() => {
        if (solved.length === 0) {
            fetch("https://codeforces.com/api/user.status?handle=" + localStorage.getItem('username') +"&verdict=OK")
            .then((res) => res.json())
            .then(
                
                (res) => {
                    console.log(res.result);
                    setsolved(res.result);
                   
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    })

    useEffect(() => {
        if (solvedprob.length === 0) {
            fetch("https://codeforces.com/api/user.status?handle=" + localStorage.getItem('username') + "&verdict=OK")
            .then((res) => res.json())
            .then(
                (res) => {
                    var temp = [];
                    for (var i = 0; i < res.result.length; i++) {
                        if (res.result[i].verdict !== "OK") continue;
                        var name = res.result[i].problem.name;
                        var contest = res.result[i].problem.contestId;
                        var obj = {
                            "name" : name,
                            "contest" : contest
                        }
                        temp.push(obj)
                    }
                    setsolvedprob(temp);
                }
            )
        }
        if (rtg === -1) {
            fetch("https://codeforces.com/api/user.info?handles=" + localStorage.getItem('username'))
            .then((res) => res.json())
            .then(
                (res) => {
                    console.log("rating : ", res.result[0].rating);
                    setrating(res.result[0].rating);
                },
                (err) => {
                    console.log("uhh ohh", err);
                }
            )
        }
        fetch("https://zenseprojectcodecase.herokuapp.com/problems/", {
            method : 'get',
            headers: new Headers({
                Authorization: "Bearer " + localStorage.getItem('token'),
                username: localStorage.getItem('username')
            }),
            
        })
        .then((res) => res.json())
        .then(
            (res) => {
                var temp2 = [];
                var pprob = res;
                for (var i = 0; i < pprob.length; i++) {
                    var curr1 = pprob[i];
                    var found = false;
                    for (var j = 0; j < solved.length; j++) {
                        var currsol = solved[j].problem;
                        if (currsol.name === curr1.name && currsol.contest === curr1.contest) {
                            found = true;
                        }
                    }
                    if (!found) {
                        temp2.push(curr1);
                    }
                }
                setpendproblems(temp2.length)
            },
            (err) => {
                console.log(err);
            }
        )
    })

    function toggleModal1() {
        setisModel1Open(!isModel1Open);
    }

    function handleClick() {
        setisModel1Open(!isModel1Open);
        console.log(pendprob);
        if (Number(warmprob.value)+Number(numprob.value)+pendprob >= 50) {
            console.log(Number(warmprob.value)+Number(numprob.value)+pendprob);
            alert('Limit of 50 reached! Please solve the pending problems first from the ' +
            'dashboard!');
            return;
        }
        setload(1);
        fetch("https://codeforces.com/api/problemset.problems")
        .then((res) => res.json())
        .then (
            (res) => {
                console.log("hiiiii");
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
                setallprob(temp);
                var currR = (Math.round(rtg/100))*100;
                console.log(rtg, currR);
                var delta = 100;
                var temp1 = [];
                shuffleArray(temp);
                console.log(solvedprob);
                for (var i = 0; i < temp.length; i++) {
                    if (temp1.length === Number(warmprob.value)) {
                        break;
                    }
                    var curr = temp[i];
                    var found = false;
                    for (var j = 0; j < solvedprob.length; j++) {
                        if (curr.name === solvedprob[j].name && curr.contest === solvedprob[j].contest) {
                            found = true;
                        }
                    }
                    if (!found && curr.rating === 800) {                        
                        temp1.push(curr);
                    }
                }
                console.log("temp11", temp1);
                console.log(solvedprob);
                for (var i = 0; i < temp.length; i++) {
                    console.log(temp1.length, Number(numprob.value));
                    if (temp1.length === Number(numprob.value)) {
                        break;
                    }
                    var curr = temp[i];
                    var found = false;
                    for (var j = 0; j < solvedprob.length; j++) {
                        if (curr.name === solvedprob[j].name && curr.contest === solvedprob[j].contest) {
                            found = true;
                        }
                    }
                    if (!found && curr.rating === currR) {
                        
                        if (currR - rtg < 400) currR += delta;
                        temp1.push(curr);
                    }
                }
                setproblist(temp1);
                console.log("temp1", temp1)
                console.log("allprob", allprob)
                console.log("res", res);
                setload(2);
                axios.post('https://zenseprojectcodecase.herokuapp.com/problems/upd', {
                    username: localStorage.getItem('username'),
                    problems: temp1
                }).then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            },
            (err) => {
                console.log(err);
            }
        )
        
    }

    function RenderQuestions() {
        if (load === 0) {
            return (
                null
            )
        }
        if (load === 1) {
            return (    
                <div>
                    <div className="col text-center">
                        <h5 className="h1t1 h1t2 h1t3">Loading ...</h5>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <p className="h1t1 h1t2 h1t3">This may take upto 2 min depending on how busy
                        codeforces server is 
                        </p>
                    </div>
                </div>           
        )
        }
        else {
            var count = 1;
            const items = problist.map((prob) => {
                var lnk = "https://codeforces.com/problemset/problem/" + prob.contest + "/" + prob.index
                return (
                    <tr>
                        <th>{count++}</th>
                        <th>{prob.index}</th>
                        <th>{prob.rating}</th>
                        <th>{prob.name}</th>
                        <th><a href={lnk} className=" h1t1 a2"> Go to Problem </a></th>
                    </tr>
                )
            })
            return (
                <Table responsive hover bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Index</th>
                            <th>Problem Rating</th>
                            <th>Problem Name</th>
                            <th>Problem Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </Table>
            )
        }
    }
    if (rtg === -1 || solvedprob.length === 0) {
        return (
            <div>
                <Navb2 redir={redir} setredir={setredir}/>
                <div className="row mt-9 mb-10">
                    <h1 className="h1t1 h1t2 h1t3">
                        Loading...
                    </h1>
                </div>
                
                <Foot/>
            </div>
        )
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
                                <option>0</option>
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
                <div className="row mt-3 row-content1">
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
                <div className="row mt-5">
                    <RenderQuestions/>
                </div>
            </div>
            <Foot/>
        </div>
    )
}

export default PracticeProblems;