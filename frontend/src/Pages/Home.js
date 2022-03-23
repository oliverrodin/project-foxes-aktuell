import React, { useState, useEffect, useContext } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import "./Report.css";
import { LoginContext } from '../Context/LoginContext'
import "./Modal.css"; 

import Navbar from './Navbar'

function Home() {
  const [reports, setReports] = useState([]);
  const [project, setProject] = useState([]);
  const [hej, setHej] = useState([]);
  const [popupcontent, setpopupcontent] = useState([]);
  const [popuptoggle, setpopuptoggle] = useState(false);
  const { name } = useContext(LoginContext);
  const changeContent=(value)=>{
    setpopupcontent([value]);
    setpopuptoggle(!popuptoggle);
  };


  
  
  useEffect(() => {
    axios
      .post("http://localhost:3001/getdatabase/report", {data: ""}, { headers: {accessToken: sessionStorage.getItem("accessToken")} } )
      .then((response) => {
        setReports(response.data);
        
      });

    axios
      .post("http://localhost:3001/getdatabase/activeproject", {data: ""}, { headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }})
      .then((response) => {
        setProject(response.data)
      })
      
    

  }, []);

  return (
    <>
    <Navbar />
    

      <div className="home-page">
        <div className="project-container">
          <h2>Mina projekt <Link to="/project" className="link">
              <i class="fa-solid fa-plus" ></i>
            </Link></h2>
          
            <table className=" table-container">
              <thead className="table-head">
                <th>Project</th>
                <th>Status</th>
                <th>Datum</th>
                <th>Tid</th>
              </thead>
              <tbody>
                {
                  project.map((row) => {
                    return (
                      <tr className="project-line">
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td>{row.dateStart} - {row.dateEnd}</td>
                        <td>{row.hours}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          
          
        </div>
        
        <div className='report-container'>

          <h2 className="report-header">Mina tidsrapporter <Link to="/createreport" className="link">
              <i class="fa-solid fa-plus" ></i>
            </Link>
          </h2>
          <table className="table-container">
              <thead className="table-head">
              <th>Datum</th>
                <th>Project</th>
                
                
                
              </thead>
              <tbody>
                {
                  reports.map((row) => {
                    return (
                      <tr className="report-line" onClick={()=>changeContent(row)}>
                        <td>{row.date}</td>
                        <td>{row.projectName}</td>
                        <td></td>
                        
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        
          
        
        </div>
        
            {/* Pop-Up-Modalen för varje tidrapport */}
        {popuptoggle &&
        <div className="pop-up-container" onClick={changeContent}>
          <div className="pop-up-body" onClick={(e)=>e.stopPropagation()}>
              <div className="pop-up-header">
              <button className="modalbtn" onClick={changeContent}> X </button>
            </div>
            <div className="pop-up-content">
              {popupcontent.map((pop)=>{
                return (
                  <div className="pop-up-card">
                    <p className="text-line">Namn: {pop.personName}</p>
                    <p className="text-line">Projekt: {pop.projectName}</p>
                    <p className="text-line">Datum: {pop.date}</p>
                    <p className="text-line">Timmar: {pop.hours}</p>
                    <p className="text-line">Anteckning: {pop.note}</p>
                    <p className="text-line">Kommentar: {pop.comment}</p>
                    <form className="pop-up-input">
                    <label>
                      Lägg till kommentar:
                      <input type="text" name="name" />
                    </label>
                  </form>
                  </div>
                )
              })}
            </div>
          </div>
        </div>}
      </div>
              {/* Slut på Pop-Up-Modalen */}
    
    </>
  );
}

export default Home;
