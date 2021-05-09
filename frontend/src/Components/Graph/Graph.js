import React, { useState } from 'react';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';
import './Graph.css';

const rand = () => Math.round(Math.random() * 255);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'white',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
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

const data2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    yAxes: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 30,
          weight: 'bold',
        },
      },
      display: true,
    },
    xAxes: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'pink',
        font: {
          size: 30,
          weight: 200,
        },
      },
    },
  },
};

const types = ['bar', 'doughnut', 'radar'];

function Graph() {
  const [type, setType] = useState('bar');
  function toggleType() {
    const index = (types.indexOf(type) + 1) % types.length;
    setType(types[index]);
  }
  return (
    <div class="root">
      <h1 className="title">MultiType Chart</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {type === 'doughnut' ? (
          <Doughnut
            data={data2}
            height={500}
            options={{ maintainAspectRatio: false, plugins: {legend: {display: false}}}}
          />
        ) : null}
        {type === 'radar' ? (
          <Radar
            data={data2}
            height={500}
            options={{ maintainAspectRatio: false, plugins: {legend: {display: false}}, scales: {
                r: {
                    grid: {
                        color: ['white', 'purple']
                    }
                }
            }}}
          ></Radar>
        ) : null}
        {type === 'bar' ? (
          <Bar data={data} height={500} width={1000} options={options} />
        ) : null}
      </div>
      <div onClick={toggleType}>
        <h1 style={{ border: '1px solid white' }}>
          Click here to Toggle Chart
        </h1>
      </div>
    </div>
  );
}

export default Graph;
