import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Report.css";
import { LoginContext } from '../Context/LoginContext'

function Home() {
  const [reports, setReports] = useState([]);
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
      </div>
      
    </div>
  );
}

export default Home;
