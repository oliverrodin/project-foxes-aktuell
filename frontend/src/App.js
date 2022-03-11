import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'


//Pages
import Home from './Pages/Home'
import CreateReport from './Pages/CreateReport'

function App() {

 
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to="/" className="link"> Homepage</Link>
        <Link to="/createreport" className="link"> Create New Timereport</Link>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createreport" element={<CreateReport />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
