import React, { useState } from "react";
import Navb2 from "./Navbar2";
import Foot from "./Footer";
function Dashboard(props) {
    
    const[redir, setredir] = useState(false);

    return (
        <div>
            <Navb2 redir={redir} setredir={setredir}/>
            <h1>
                Welcome {localStorage.getItem('username')} !
            </h1>
            <Foot />
        </div>
    )
}

export default Dashboard;