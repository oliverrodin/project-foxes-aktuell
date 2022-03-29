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
import {Bar, Chart, getElementAtEvent, Line} from 'react-chartjs-2'



import { BarChart } from '../Components/Chart'
import './weeks.css'

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

    const {fullChart, setFullChart} = useState( new ChartJS())

    // const moveChart = {
    //     id: 'moveChart',
    //     afterEvent(chart, args) {
    //         const {ctx, canvas, chartArea: {left, right, top, bottom, width, height} } = chart;

    //         canvas.addEventListener( 'mousemove', (event) => {
                
    //             const x = args.event.x;
    //             const y = args.event.y;

    //             if(x >= left -15 && x <= left +15 && y >= height / 2 + top - 15 &&
    //             y <= height / 2 + top + 15 ) {
    //                 canvas.style.cursor = 'pointer';
    //             } else if (x >= right -15 && x <= right +15 && y >= height / 2 + top - 15 &&
    //             y <= height / 2 + top + 15 ) {
    //                 canvas.style.cursor = 'pointer';
    //             } else {
    //                 canvas.style.cursor = 'default';
    //             }


    //         })
    //     },

    //     // afterEvent(chart, args) {
    //     //     const {ctx, canvas, chartArea: {left, right, top, bottom, width, height} } = chart;

    //     //     canvas.addEventListener( 'click', (event) => {
    //     //         const x = args.event.x;
    //     //         const y = args.event.y;

    //     //         console.log(x)
    //     //         console.log(y)

    //     //         if(x >= right -15 && x <= right +15 && y >= height / 2 + top - 15 &&
    //     //         y <= height / 2 + top + 15 ) {

    //     //             chart.options.scales.x.min = chart.options.scales.x.min + 8;
    //     //             chart.options.scales.x.max = chart.options.scales.x.max + 8;

    //     //             chart.update();
    //     //         }

    //     //     })
    //     // },

    //     afterDraw(chart, args, pluginOptions) {
    //         const {ctx, chartArea: {left, right, top, bottom, width, height} } = chart;
            

    //         class CircleChevron {
    //             // constructor(x1, y1) {

    //             // }

    //             draw(ctx, x1, pixels) {
    //                 const angle = Math.PI / 180;
    //                 ctx.beginPath();
    //                 ctx.lineWidth = 3;
    //                 ctx.strokeStyle = 'rgba(102, 102, 102, 0.5)';
    //                 ctx.fillStyle = 'white';
    //                 ctx.arc(x1, height / 2 + top, 15, angle * 0, angle * 360, false)
    //                 ctx.stroke();
    //                 ctx.fill();
    //                 ctx.closePath();

    //                 ctx.beginPath();
    //                 ctx.lineWidth = 3;
    //                 ctx.strokeStyle = 'rgba(255, 26, 104, 1)'
    //                 ctx.moveTo(x1 + pixels, height / 2 + top - 7.5);
    //                 ctx.lineTo(x1 - pixels, height / 2 + top);
    //                 ctx.lineTo(x1 + pixels, height / 2 + top + 7.5);
    //                 ctx.stroke();
    //                 ctx.closePath();
    //             }
    //          }

    //         let drawCircleLeft = new CircleChevron();
    //         drawCircleLeft.draw(ctx, left, 5);

    //         let drawCircleRight = new CircleChevron();
    //         drawCircleRight.draw(ctx, right, -5);


    //     }
    // }

    
    
    // function moveScroll(chart, args) {
        
    //    const { ctx, canvas, chartArea: {left, right, top, bottom, width, height }} = 
    //     console.log('ok')
    //    canvas.addEventListener('click', (event) => {
    //        const rect = canvas.getBoundingClientRect();
    //        const x = event.clientX - rect.left;
    //        const y = event.clientY - rect.top;
    //        console.log(x)
    //        console.log(y)
    //    })

    // }
     

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
            setChartOptions({
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
                        min: 0,
                        max: 7,
                    }
                },
                
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