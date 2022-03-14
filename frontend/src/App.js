import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'


//Pages
import Home from './Pages/Home'
import CreateReport from './Pages/CreateReport'
import Navbar from './Pages/Navbar'
function App() {

 
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
              
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createreport" element={<CreateReport />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
