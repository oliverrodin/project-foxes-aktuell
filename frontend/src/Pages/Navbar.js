import React,{useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom'
import './Navbar.css'
import {Button} from '../Components/Button.js'
import CustomSelect from "../Components/CustomSelect";
import { LoginContext } from '../Context/LoginContext'
import axios from "axios";
import {Formik, Form} from "formik";


function App() {
    const [filter, setFilter] = useState("");  
    const [person, setPerson] = useState([]);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const { name } = useContext(LoginContext);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {

        if(window.innerWidth <= 960) {
            setButton(false);
        }

        else {
            setButton(true)
        }

    };
    useEffect(() => {
        
        showButton();

    }, []);
    window.addEventListener('resize', showButton);

    const logout = () => {
        sessionStorage.clear()
    }
    

  return (    
    <nav className='navbar'>
        <div className='navbar-container'>
            <Link to="/home" className="navbar-logo" onClick={closeMobileMenu}>
                Foxes <i className='fa-solid fa-code'/> 
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                {/* <li className='nav-item'>
                    <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                        Startsida
                    </Link>
                </li> */}
                {/* <li className='nav-item'>
                    <Link to='/createreport' className='nav-links' onClick={closeMobileMenu}>
                        Skapa tidsrapport
                    </Link>
                </li> */}
                <li className='user nav-links'>{name}</li>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={logout}>
                        Logga ut
                    </Link>
                </li>
            </ul>
            
           
            
        </div>
    </nav>
    
  );
}

export default App;
