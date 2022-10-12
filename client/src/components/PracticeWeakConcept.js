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

function PracticeWeakConcept() {
    const [redir, setredir] = useState(false);
    const [isModel1Open, setisModel1Open] = useState(false);
    const [added, setadded] = useState([]);
    const [currtag, setcurrtag] = useState('');
    const [unsolvedtag, setunsolvedtag] = useState([]);
    const [rtg, setrating] = useState(-1);
    const [allprob, setallprob] = useState([]);
    const [ploaded, setploaded] = useState(0);
    const [pendprob, setpendproblems] = useState(0);
    const[solved, setsolved] = useState([]);

    function toggleModal1() {
        setisModel1Open(!isModel1Open);
    }

    useEffect(() => {
        if (solved.length === 0) {
            fetch("https://codeforces.com/api/user.status?handle=" + localStorage.getItem('username') +"&verdict=OK")
            .then((res) => res.json())
            .then(
                
                (res) => {
                    console.log(res);
                    console.log(res.result);
                    setsolved(res.result);
                   
                },
                (err) => {
                    console.log(err);
                }
            )
        }
        
        if (unsolvedtag.length === 0) {
            fetch("https://codeforces.com/api/user.status?handle=" + localStorage.getItem('username'))
            .then((res) => res.json())
            .then(
                (res) => {
                    var temp = unsolvedtag;
                    console.log(res);
                    for (var i = 0; i < res.result.length; i++) {
                        //console.log(res.result[i]); 
                        if (res.result[i].verdict === "OK") continue;
                        var tags = res.result[i].problem.tags
                        for (var j = 0; j < tags.length; j++) {
                            var found = false;
                            for (var k = 0; k < temp.length; k++) {
                                if (temp[k].tag === tags[j]) {
                                    found = true;
                                    temp[k].count = temp[k].count + 1;
                                }
                            }
                            if (!found) {
                                var obj = {
                                    "tag" : tags[j],
                                    "count" : 1
                                }
                                temp.push(obj);
                            }
                        }            
                    }
                    setunsolvedtag(temp);
                    
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
                        var tag = curr.tags;

                        var obj = {
                            "name" : name,
                            "rating" : rating,
                            "index" : index,
                            "contest" : contest,
                            tags : tag
                        }
                        
                        temp.push(obj);
                    }
                    
                    setallprob(temp);
                },
                (err) => {
                    console.log(err);
                }
            )
        }
        fetch("https://zenseprojectcodecase.herokuapp.com/:3001/problems/", {
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

    //Comparer Function    
    function GetSortOrder(prop) {    
        return function(a, b) {    
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    }

    function Generate() {
        setploaded(1);
        var count = 8;
        var currR = Math.round(rtg/100)*100;
        var temp = [];
        shuffleArray(allprob);

        unsolvedtag.sort(GetSortOrder("count"));
        unsolvedtag.reverse();
        console.log(unsolvedtag);
        var j = -1;
        for (var i = 0; i < unsolvedtag.length; i++) {
            var flag  = 0;
            var count = 0;
            
            for (var j = 0; j < allprob.length; j++) {
                if (flag === 1) break;
                if (count === 2) break;
                for (var k = 0; k < allprob[j].tags.length; k++) {
                    if (count === 2) break;
                    if (allprob[j].tags[k] === unsolvedtag[i].tag) {
                        console.log(allprob[j].tags[k], unsolvedtag[i].tag);
                        if (allprob[j].rating === currR) {
                            if (currR < 1800)currR += 100;
                            if (count === 2) continue;
                            temp.push(allprob[j]);
                            count++;
                            
                            if (temp.length === 8) {
                                flag = 1;
                                break;
                            }
                        }
                    }
                }
            }
            if (flag) break;
        }

        if (pendprob + 8 <= 50) {
            console.log(temp);
            setadded(temp);
            axios.post('https://zenseprojectcodecase.herokuapp.com/:3001/problems/upd', {
                username: localStorage.getItem('username'),
                problems: temp
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
            setploaded(2);
        }
        else {
            alert('Maximum limit of 50 reached! Please solve the pending problems first from dashboard');
            setploaded(0);
        }
    }

    function RenderQes() {
        if (ploaded === 0) {
            return (
                null
            )
        }
        else if (ploaded === 1) {
            return (
                <div className="row mt-3">
                    <h3 className="h1t1 h1t2 h1t3">Loading...</h3>
                </div>
            )
        }
        else {
            var count = 1;
            const ques = added.map((prob) => {
                var lnk = "https://codeforces.com/problemset/problem/" + prob.contest + "/" + prob.index
                return (
                    <tr>
                        <th>{count++}</th>
                        <th>{prob.name}</th>
                        <th>{prob.rating}</th>
                        <th><a href={lnk} className=" h1t1 a2"> Go to Problem </a></th>
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
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ques}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }

    return (
        <div>
            <Navb2 redir={redir} setredir={setredir}/>
            <div className="container">
                <div className="row row-content1 mt-5">
                    <h3 className="h1t1 h1t2 h1t3">
                        Welcome to Practice Weak Concept Section!
                    </h3>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col text-center">
                        <button className="btn btn-dark btn-lg" onClick={Generate}>
                            Generate!
                        </button>
                    </div>
                </div>
                <div className="row mt-5">
                    <RenderQes/>
                </div>
            </div>
            <div className="mt-8">
                <Foot/>
            </div>
        </div>
    )
}

export default PracticeWeakConcept;