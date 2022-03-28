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
import {Bar, Line} from 'react-chartjs-2'



import { BarChart } from '../Components/Chart'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)


const getData = async () => {
    const labels = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52']
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0]


    await axios.post("http://localhost:3001/getdatabase/weeks").then(res => {
        

        for (let index = 0; index <= 51; index++) {
            
            res.data.forEach(element => {
                if (element.week === labels[index]) {
                    data[index] += element.hours
                }
            });
            

            
            
        }
        
        // res.data.forEach(element => {
        //     labels.push(element.week)
        //     data.push(element.hours)
        // });

    })
    return {
        labels,
        data
        
    }
}

function Weeks() {
    const [chartData, setChartData] = useState({
        datasets: []
    })
    const [chartOptions, setChartOptions] = useState({})
    

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
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.4)"
                    }
                ]
            })
            setChartOptions({
                responsive: true,
                plugins: {
                    Legend: {
                        position: "top"
                    },
                    Title: {
                        display: true,
                        text: "Hours worked"
                    }
                }
            }) 
        
        
    })


        

    }
          
      

    useEffect(() => {
        
        chart()
        
    }, [])
    
    
    
  return (
    
    <div>
        <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default Weeks