import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, settoken] = useState('');
  const [username, setusername] = useState('');
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
            <Route path='/dashboard' element={<Dashboard username={username}/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
    
    

  );
}

export default App;
