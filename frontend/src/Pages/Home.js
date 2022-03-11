
import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Home() {
    const [reports, setReports] = useState([]);

    useEffect( () => {
      axios.post("http://localhost:3001/getdatabase/report").then((response) => {
        setReports(response.data)
      }) 
    }, [])

    

  
  return (
    <div>
      {console.log(reports)}
      {
        reports.map((value) => {
          return(
            <div className='report-card'>
              <ul key={value.id}>
                <li>Person: {value.personName}</li>
                <li>Project: {value.projectName}</li>
                <li>Date: {value.date}</li>
                <li>Hours:{value.hours}</li>
                <li>Note: {value.note}</li>
                <li>Comment: {value.comment}</li>
                
              </ul>
              <button>Edit Timereport</button>
              <button type='myButton'>Add Comment</button>
              
            </div>
          )
        })
      }   
    </div>
  )
}

export default Home