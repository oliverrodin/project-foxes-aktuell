import React,{useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import './Navbar.css'
import {Button} from '../Components/Button.js'
import CustomSelect from "../Components/CustomSelect";
import axios from "axios";
import {Formik, Form} from "formik";


function App() {
    const [filter, setFilter] = useState("");  
    const [person, setPerson] = useState([]);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

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
        axios.post("http://localhost:3001/getdatabase/people").then((response)=>{
            setPerson(response.data)
            console.log(response.data)
        })
        showButton();

    }, []);
    window.addEventListener('resize', showButton);

    const onSubmit = (value) => {
        
        console.log(value)
        
    }

  return (    
    <nav className='navbar'>
        <div className='navbar-container'>
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                Foxes <i className='fa-solid fa-code'/> 
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/createreport' className='nav-links' onClick={closeMobileMenu}>
                        Skapa tidsrapport
                    </Link>
                </li>
            </ul>
            
            <Formik initialValues={{person: {}}} onSubmit={onSubmit}>
                {props=>(
                    <Form>
                    <CustomSelect name="person">
                         <option value="">Select person</option>
                            {
                                person.map((pages) => {
                                    return (
                                    <>
                                        <option value={pages.name}>{pages.name}</option> 
                                    </>
                                    )
                                    
                                })
                            } 
                    </CustomSelect>
                        <button type="submit">Välj Person</button>
                    </Form>
                )}

                
            </Formik>
            
        </div>
    </nav>
    
  );
}

export default App;
