
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Report.css'

function Home() {
    const [reports, setReports] = useState([]);

    useEffect( () => {
      axios.post("http://localhost:3001/getdatabase/report").then((response) => {
        setReports(response.data)
      }) 
    }, [])

    

  
  return (
    <div className='home-container'>
      {console.log(reports)}
      {
        reports.map((value) => {
          return(
            <div className='report-card'>
              <ul key={value.id}>     
                <li>Date: {value.date}</li>          
                <li>Project: {value.projectName}</li>                
              </ul>              
            </div>
          )
        })
      }   
    </div>
  )
}

export default Home