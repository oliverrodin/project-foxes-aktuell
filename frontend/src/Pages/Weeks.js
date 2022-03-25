import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'
import { BarChart } from '../Components/Chart'

function Weeks() {
    const [information, setInformation] = useState({})
    const fetchInfo = async () => {
        let name = [];
        let hours = [];
        const res = await axios.post("http://localhost:3001/getdatabase/people", {data: " "}, { headers: { accessToken: sessionStorage.getItem("accessToken")}})
        .then( res => {
            console.log(res)
            for (const dataObj of res.data){
                name.push(dataObj.name)
                hours.push(dataObj.hours)
            }

        })

        console.log(name, hours)
        setInformation({
            labels: name,
            datasets: [
              {
                label: "Price in USD",
                data: hours,
                backgroundColor: [
                  "#ffbb11",
                  "#ecf0f1",
                  "#50AF95",
                  "#f3ba2f",
                  "#2a71d0"
                ]
              }
            ]
          });
    
    }
  
    useEffect(() => {
        

        fetchInfo()
       
       
    }, [])

    

    

  return (
    
       <div>
        <Bar
          data={information}
          options={{
              plugins: {
                  title: {
                      display: true,
                      text: "hdgkjsjlsakhglk"
                  },
                  legend: {
                      display: true,
                      position: "bottom"
                  }
              }
          }}
        />
    </div>
  )
}

export default Weeks