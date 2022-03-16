import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Report.css";
import { LoginContext } from '../Context/LoginContext'
import "./Modal.css";


  

function Home() {
  const [reports, setReports] = useState([]);
  const [hej, setHej] = useState([]);
  const [cid, setCid] = useState([]);
  const [popupcontent, setpopupcontent] = useState([]);
  const [popuptoggle, setpopuptoggle] = useState(false);
  const changeContent=(value)=>{
    setpopupcontent([value]);
    setpopuptoggle(!popuptoggle);
  };
  
  const { name } = useContext(LoginContext);

  
  
  useEffect(() => {
    axios
      .post("http://localhost:3001/getdatabase/report", {data: ""}, { headers: {accessToken: sessionStorage.getItem("accessToken")} } )
      .then((response) => {
        setReports(response.data);
        
      });
      
    

  }, []);

  return (
    <div className="home-section ">
      <div className="header">
        <h1 className="header-h1">{name}</h1> 
      </div>
      <div className="left-container"></div>
      <div className='report-container'>
         {reports.map((value) => {
            return (
              <div className='report-card'>
                <ul key={value.id}>
                  <li>Date: {value.date}</li>
                  <li>Project: {value.projectName}</li>
                </ul>
              </div>
            );
          })} 
        <div className="header-h1">{hej}</div> 
      </div>
      <div className="left-container"></div>
      <div className='report-container'>
        {reports.map((value) => {
          return (
            <div className='report-card' onClick={()=>changeContent(value)}>
              <ul key={value.id}>
                <li>Date: {value.date}</li>
                <li>Project: {value.projectName}</li>
              </ul>
            </div>
          );
        })}
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
                  <p>Name: {pop.personName}</p>
                  <p>Project: {pop.projectName}</p>
                  <p>Date: {pop.date}</p>
                  <p>Hours: {pop.hours}</p>
                  <p>Note: {pop.note}</p>
                  <p>Comment: {pop.comment}</p>
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
              {/* Slut på Pop-Up-Modalen */}
    </div>
  );
}

export default Home;
