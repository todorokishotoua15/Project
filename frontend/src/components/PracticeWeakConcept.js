import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Navb2 from "./Navbar2";
import Foot from "./Footer";

function PracticeWeakConcept() {
    const [redir, setredir] = useState(false);
    const [isModel1Open, setisModel1Open] = useState(false);
    const [added, setadded] = useState([]);
    const [currtag, setcurrtag] = useState('');

    function toggleModal1() {
        setisModel1Open(!isModel1Open);
    }

    function AddTags() {
        console.log(currtag.value);
        if (currtag.value !== '') {
            var temp = added;
            var found = false;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i] === currtag.value) found = true;
            }
            if (!found) temp.push(currtag.value);
            setadded(temp);
        }
        toggleModal1();
    }

    function RenderAddedTags() {
        console.log(added);
        if (added.length === 0) {
            return (
                null
            )
        }
        else {
            var count = 1;
            const tags = added.map((tag) => {
                return (
                    <tr>
                        <th>
                            {count++}
                        </th>
                        <th>
                            {tag}
                        </th>
                    </tr>
                )
            })

            return (
                <div>
                    <Table responsive hover bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Problem Tags</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags}
                        </tbody>
                    </Table>
                    <div className="col-12 text-center mt-5">
                        <button className="btn btn-lg btn-dark bbb1" onClick={Generate}>
                            Generate!
                        </button>
                    </div>
                </div>
            )
        }
    }

    function Generate() {
        
    }

    return (
        <div>
            <Modal isOpen={isModel1Open} toggle={toggleModal1} >
                <ModalHeader toggle={toggleModal1} charCode="Y" className='modhead'>Practice Problems!</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor="select">Select Tag</Label>
                            <Input type="select" name="select" id="select" innerRef={(inp) => setcurrtag(inp)}>
                                    <option value="2-sat" title="2-satisfiability">2-sat</option>
                                    <option value="binary search" title="Binary search">binary search</option>
                                    <option value="bitmasks" title="Bitmasks">bitmasks</option>
                                    <option value="brute force" title="Brute force">brute force</option>
                                    <option value="chinese remainder theorem" title="Сhinese remainder theorem">chinese remainder theorem</option>
                                    <option value="combinatorics" title="Combinatorics">combinatorics</option>
                                    <option value="constructive algorithms" title="Constructive algorithms">constructive algorithms</option>
                                    <option value="data structures" title="Heaps, binary search trees, segment trees, hash tables, etc">data structures</option>
                                    <option value="dfs and similar" title="Dfs and similar">dfs and similar</option>
                                    <option value="divide and conquer" title="Divide and Conquer">divide and conquer</option>
                                    <option value="dp" title="Dynamic programming">dp</option>
                                    <option value="dsu" title="Disjoint set union">dsu</option>
                                    <option value="expression parsing" title="Parsing expression grammar">expression parsing</option>
                                    <option value="fft" title="Fast Fourier transform">fft</option>
                                    <option value="flows" title="Graph network flows">flows</option>
                                    <option value="games" title="Games, Sprague–Grundy theorem">games</option>
                                    <option value="geometry" title="Geometry, computational geometry">geometry</option>
                                    <option value="graph matchings" title="Graph matchings, König's theorem, vertex cover of bipartite graph">graph matchings</option>
                                    <option value="graphs" title="Graphs">graphs</option>
                                    <option value="greedy" title="Greedy algorithms">greedy</option>
                                    <option value="hashing" title="Hashing, hashtables">hashing</option>
                                    <option value="implementation" title="Implementation problems, programming technics, simulation">implementation</option>
                                    <option value="interactive" title="Interactive problem">interactive</option>
                                    <option value="math" title="Mathematics including integration, differential equations, etc">math</option>
                                    <option value="matrices" title="Matrix multiplication, determinant, Cramer's rule, systems of linear equations">matrices</option>
                                    <option value="meet-in-the-middle" title="Meet-in-the-middle">meet-in-the-middle</option>
                                    <option value="number theory" title="Number theory: Euler function, GCD, divisibility, etc">number theory</option>
                                    <option value="probabilities" title="Probabilities, expected values, statistics, random variables, etc">probabilities</option>
                                    <option value="schedules" title="Scheduling Algorithms">schedules</option>
                                    <option value="shortest paths" title="Shortest paths on weighted and unweighted graphs">shortest paths</option>
                                    <option value="sortings" title="Sortings, orderings">sortings</option>
                                    <option value="string suffix structures" title="Suffix arrays, suffix trees, suffix automatas, etc">string suffix structures</option>
                                    <option value="strings" title="Prefix- and Z-functions, suffix structures, Knuth–Morris–Pratt algorithm, etc">strings</option>
                                    <option value="ternary search" title="Ternary search">ternary search</option>
                                    <option value="trees" title="Trees">trees</option>
                                    <option value="two pointers" title="Two pointers">two pointers</option>
                          
                            </Input>
                        </FormGroup>
                    </Form>    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type='submit' value="submit" onClick={AddTags}>Add</Button>{' '}
                    <Button color="secondary" onClick={toggleModal1}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Navb2 redir={redir} setredir={setredir}/>
            <div className="container">
                <div className="row row-content1 mt-5">
                    <h3 className="h1t1 h1t2 h1t3">
                        Welcome to Practice Weak Concept Section!
                    </h3>
                </div>
                <div className="row mt-5 mb-5">
                    <div className="col-6 text-center">
                        <button className="btn btn-dark btn-lg w-50 b11 ">
                            Let system decide
                        </button>
                    </div>
                    <div className="col-6  text-center mb-5">
                        <button className="btn btn-dark btn-lg w-50 b11 " onClick={toggleModal1}>
                            Select your own 
                        </button>
                    </div>
                </div>
                <div className="row mt-5">
                    <RenderAddedTags/>
                </div>
            </div>
            <div className="mt-8">
                <Foot/>
            </div>
        </div>
    )
}

export default PracticeWeakConcept;