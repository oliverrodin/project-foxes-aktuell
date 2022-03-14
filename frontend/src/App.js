import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'


//Pages
import Home from './Pages/Home'
import CreateReport from './Pages/CreateReport'
import Navbar from './Pages/Navbar'
import Login from './Pages/Login'
function App() {

 
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
              
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createreport" element={<CreateReport />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
