import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'


//Pages
import Home from './Pages/Home'
import CreateReport from './Pages/CreateReport'
import Navbar from './Pages/Navbar'
import Login from './Pages/Login'
import Post from './Pages/Post'
function App() {

 
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
              
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createreport" element={<CreateReport />} />
          <Route path="/post/:id" element={<Post/>} />  
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
