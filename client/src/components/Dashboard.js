import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalBody, ModalFooter, Input, Label,
         Form, FormGroup, ModalHeader } from 'reactstrap';
import Navb2 from "./Navbar2";
import Foot from "./Footer";
import CanvasJSReact from '../canvasjs.react';
import { useNavigate } from "react-router";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart


function Dashboard(props) {

    const[solved, setsolved] = useState([]);
    const[loaded, setloaded] = useState(false);
    const[err, seterr] = useState(null);
    const[solvedTags, setsolvedTags] = useState([]);
    const[pendproblems, setpendproblems] = useState([]);
    const [ploaded, setploaded] = useState(false);
    
    
    useEffect(() => {
        if (solvedTags.length === 0) {
            fetch("https://codeforces.com/api/user.status?handle=" + localStorage.getItem('username') +"&verdict=OK")
            .then((res) => res.json())
            .then(
                
                (res) => {
                    console.log(res);
                    console.log(res.result);
                    setsolved(res.result);
                    setloaded(true);
                    var temp = [];
                    for (var i = 0; i < solved.length; i++) {
                        for (var j = 0; j < solved[i].problem.tags.length; j++) {
                            var currtag = solved[i].problem.tags[j];
                            var found = false;
                            for (var k = 0; k < temp.length; k++) {
                                if (temp[k].label  === currtag) {
                                    found = true;
                                    temp[k].y = temp[k].y + 1;
                                }
                            }
                            if (found === false) {
                                var obj = {
                                    label: currtag,
                                    "y": 1
                                }
                                temp.push(obj);
                            }
                        }
                    }
                    
                    setsolvedTags(temp);
                    console.log("solvedTags: ", solvedTags);
                },
                (err) => {
                    console.log(err);
                    seterr(err);
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
                setpendproblems(res);
            },
            (err) => {
                console.log(err);
            }
        )
    })

    useEffect(() => {
        if (!ploaded) {
            fetch("https://zenseprojectcodecase.herokuapp.com/problems", {
                method: 'get',
                headers: new Headers({
                    "authorization": "Bearer " + localStorage.getItem('token'),
                    "username": localStorage.getItem('username')
                })
            }).then(res => res.json())
            .then(
                (res) => {
                    console.log("gg ", res);
                    setpendproblems(res);
                    setploaded(true);
                },
                (err) => {
                    console.log("no gg :( ", err);
                }
            )
        }
    })

    const[redir, setredir] = useState(false);
    const options = {
        exportEnabled: true,
        animationEnabled: true,
        
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: solvedTags
        }]
    }

    function RenderProblems() {
        var count = 1;
        if (pendproblems.length === 0) {
            return (
                <div className="col d-flex justify-content-center">
                    <h3 className="h1t1 h1t2 h1t3">
                        Looks Like you don't have any pending problems! Click on Practice Problems or 
                        Practice Weak Concept to get started!
                    </h3>
                </div>
            )
        }
        else {
            var temp2 = [];
            for (var i = 0; i < pendproblems.length; i++) {
                var curr1 = pendproblems[i];
                var found = false;
                for (var j = 0; j < solved.length; j++) {
                    var currsol = solved[j].problem;
                    if (currsol.name === curr1.name && currsol.contestId === curr1.contest) {
                        
                        found = true;
                    }
                }
                if (!found) {
                    temp2.push(curr1);
                }
            }
            const items = temp2.map((prob) => {
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

    

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/practice_problem';
        navigate(path);
    }

    const routeChange2 = () => {
        let path = '/createcontest';
        navigate(path);
    }

    const routeChange3 = () => {
        let path = '/practice_weak_concept'
        navigate(path);
    }

    return (
        <div >
            
            <Navb2 redir={redir} setredir={setredir}/>
            <div className="container">
                <div className="row d-flex justify-content-center row-content1">
                    <div className="col-10 col-md-5">
                        <h3 className="h1t2 h1t3">
                            Welcome {localStorage.getItem('username')}!
                        </h3>
                    </div>
                </div>
                <div className="row mt-5 mb-5 gx-5 align-items-center tt1">
                    <button className="btn btn-dark btn-lg col-6 offset-3 offset-md-0 col-md-3 bb1" onClick={routeChange}>
                        Practice!
                    </button>
                    <button className="btn btn-dark btn-lg col-6 offset-3 offset-md-0 mt-3 mt-md-0 col-md-3 offset-md-1 bb1" onClick={routeChange2}>
                        Create Contest!
                    </button>
                    <button className="btn btn-dark btn-lg col-6 offset-3 offset-md-0 mt-3 mt-md-0 col-md-3 offset-md-1 bb1" onClick={routeChange3}>
                        Practice Weak concept!
                    </button>
                </div>
                <row className="row mt-5">
                    <div className="col-12 d-flex justify-content-center mt-5">
                        <h2 className="h1t1 h1t2 h1t3">Problems solved by {localStorage.getItem('username')}:</h2>
                    </div>
                    <div className="col mt-7 mb-5">
                        <CanvasJSChart options = {options}
				            /* onRef={ref => this.chart = ref} */
			            />
                    </div>
                </row>
                <div className="row mt-5">
                    <div className="col d-flex justify-content-center">
                        <h3 className="h1t1 h1t2 h1t3">
                            Pending Problems :
                        </h3>
                    </div>
                </div>
                <div className="row mt-5">
                    <RenderProblems />
                </div>
            </div>
            <Foot />
        </div>
    )
}

export default Dashboard;