import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import PracticeProblems from './components/practice_problems';
import CreateContest from './components/createcontest';
import PracticeWeakConcept from './components/PracticeWeakConcept';
import ContactUs from './components/contactus';
function App() {
  const [token, settoken] = useState('');
  const [username, setusername] = useState('');
  const [prob, setprob] = useState(5);
  function handlesubmit(value, name) {
    console.log("function called ", value)
    settoken(value)
    setusername(name);
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login handlesubmit={handlesubmit} setuser={setusername}/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path='/dashboard' element={<Dashboard username={username} />}></Route>
            <Route path='/practice_problem' element={<PracticeProblems />}></Route>
            <Route path='/createcontest' element={<CreateContest />}></Route>
            <Route path='/practice_weak_concept' element={<PracticeWeakConcept />}></Route>
            <Route path='/contactus' element={<ContactUs/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
    
    

  );
}

export default App;
