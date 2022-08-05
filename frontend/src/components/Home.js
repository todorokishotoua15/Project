import React, { useEffect, useState } from "react";

function Home() {
    const [items, setitems] = useState([]);
    const [error, seterror] = useState(null);
    const [loaded, setloaded] = useState(false);
    

    const [toshow, settoshow] = useState([]);

    useEffect(() => {
        fetch("https://codeforces.com/api/problemset.problems")
        .then(res => res.json())
        .then(
            (res) => {
                setitems(res.result.problems);
                setloaded(true);
                console.log(res.result.problems.length);
            },
            (error) => {
                seterror(error);
            }
        )
    }, [])

    function load() {
        
        var temp = [];
        for (var i = 0; i < items.length; i++) {
            if (temp.length === 10) {
                break;
            }
            const curr = items[i];
            
            temp.push(curr);
            
        }
        //console.log(temp);
        settoshow(temp);
    }

    function RenderProblems() {
        
       
        if (loaded === false) {
            return(
                <div>
                    <h1>Loading.....</h1>
                    
                </div>
            )
            
        }
        else {
            load();
            return (
                <div>
                    <h1> Loaded!! </h1>
                    <ul>
                        {toshow.map(item => (
                            <li>
                                {item.index} {item.name} {item.rating}
                            </li>
                        ))}
                    </ul>
                </div>
            )
            
        }
            
        
    }

    return (
        <div className="row">
            <div className="col-12 col-sm-6 offset-3">
                <RenderProblems />
            </div>
        </div>  
    );
}

export default Home;