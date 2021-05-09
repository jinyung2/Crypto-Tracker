import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Graph.css';

const rand = () => Math.round(Math.random() * 20 - 10);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'black',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
  ],
};

const options = {
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        yAxes: {
            ticks: {
                font: {
                    size: 30,
                    weight: 'bold'
                },
            },
            display: true
        },
        xAxes: {
            ticks: {
                color: 'pink',
                font: {
                    size: 30,
                    weight: 200
                }
            }
        }
    }
    
}


function Graph() {
  return (
    <div class="root">
      <h1 className="title">MultiType Chart</h1>
      <Bar data={data} height={2} width={4} options={options}/>
      <h1>Graph Timeline Buttons Down Here</h1>
    </div>
  );
}

export default Graph;
