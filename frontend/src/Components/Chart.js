import React, { useState, useEffect } from 'react'
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


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const BarChart = ({labels, data}) => {
    console.log(labels)
    const [chartData, setChartData] = useState({
        datasets: []
    })  
    const [chartOptions, setChartOptions] = useState({})
    useEffect(() => {
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
      }, [])
       
    return (
        <div>
            <Bar options={chartOptions} data={chartData} />
        </div>
    )
}