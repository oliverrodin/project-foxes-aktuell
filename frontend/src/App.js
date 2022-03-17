import './App.css';
import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import axios from 'axios';

//Pages
import Home from './Pages/Home'
import CreateReport from './Pages/CreateReport'
import Navbar from './Pages/Navbar'
import Login from './Pages/Login'
import Registration from './Pages/Registration';

import { LoginContext } from './Context/LoginContext'

function App() {
  const [name, setName] = useState("");
  const [loginId, setLoginId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 
  useEffect(() => {
    axios.get('http://localhost:3001/auth/getuser', { headers: { accessToken: sessionStorage.getItem("accessToken")}}).then((response) => {
      setLoginId(response.data.id)
      setName(response.data.name)
    })
  })
  return (
    <LoginContext.Provider value={{name, loginId}}>
      <BrowserRouter>
        
              
        <Routes>
          
          <Route path="/" element= {<Login />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/createreport" element={<CreateReport />} />
        </Routes> 
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
