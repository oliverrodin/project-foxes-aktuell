import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"
import {Chart} from 'react-chartjs-2'

import './weeks.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)





function Weeks() {
    const [chartData, setChartData] = useState({
        datasets: []
    })


  
     

    const chart = () => {
        const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52']
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0]

        axios.post("http://localhost:3001/getdatabase/weeks").then(res => {
            for (let index = 0; index <= 51; index++) {
            
                res.data.forEach(element => {
                    if (element.week === labels[index]) {
                        data[index] += element.hours
                    }
                }); 
            
                

                
            }
            console.log(data)
            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Arbetade timmar",
                        data: data,
                        borderColor: "rgb(252, 184, 113)",
                        backgroundColor: "rgb(252, 184, 113, 0.6)"
                    }
                ]
                
            })
             
        
        
    })

    

        

    }
          
   

    useEffect(() => {
        
        chart()
        
        
    }, [])
    
    
    
    
  return (
    
    <div className='chart-container'>
        <h2>Arbetade timmar per vecka</h2>
        <Chart id="myChart" name="chart" type="bar" data={chartData} options={{
            responsive: true,
            Legend: {
                position: "top"
            },
            Title: {
                display: true,
                text: "Hours worked"
            },
            layout: {
               padding: {
                   right: 18
               } 
            },
            scales: {
                y: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true,
                        
                    },
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            maintainAspectRatio: false,
            pan: {
                enabled: true,
                mode: "x",
                speed: 10,

            },  
            zoom: {
                enabled: true,
                drag: false,
                mode: "x",
                rangeMin: {
                    x: 0,
                    y: 0
                },
                rangeMax: {

                }

            },  
        }} 
        
        />
    
    
        
     
    </div>
  )
}

export default Weeks