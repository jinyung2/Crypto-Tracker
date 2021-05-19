import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Radar, Line } from 'react-chartjs-2';
import axios from 'axios';
import './Graph.css';

const rand = () => Math.round(Math.random() * 255);

let options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      yAxes: {
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 10,
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
    responsive: true
  };

const types = ['bar', 'doughnut', 'radar'];
function Graph(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const diff = 10;
useEffect(() => {
    axios.get('http://localhost:5000/coin/bitcoin/h12').then(async (res) => {
        console.log(res.data);
        const labels = await res.data.data
        .map(() => '')
        .filter((val, i, arr) => i > 0 && i % diff === 0 || (i == arr.length - 1));

        const data = await res.data.data
        .map((data, i, arr) =>
        i >= diff
        ? [+arr[i - diff].priceUsd, +arr[i].priceUsd]
        : [0, +data.priceUsd]
        )
        .filter((val, i, arr) => i > 0 && i % diff === 0 || (i == arr.length - 1));

        let borderColor = ['rgba(0, 177, 106, 1)'];
        for (let i = 1; i < data.length; i++) {
            borderColor.push(data[i][0] > data[i][1] ? 'red' : 'rgba(0, 177, 106, 1)');
        }
        console.log(data);
        const min = Math.floor(data.flatMap(e => e).reduce((a,b) => Math.min(a,b)));
        const max = Math.ceil(data.flatMap(e => e).reduce((a,b) => Math.max(a,b)));
        options = {...options, scales: {...options.scales, yAxes: {...options.scales.yAxes, min: min, max: max}}};
      setData({
        labels: labels,
        datasets: [
            // {
            //   type: 'line',
            //   label: '',
            //   data: data,
            //   borderWidth: 1.5,
            //   pointBorderWidth: 0,
            //   borderColor: data[0][0] <= data[data.length-1][1] ? 'rgba(0, 177, 106, 1)' : 'rgba(219, 10, 91, 1)',
            // },
          {
            type: 'bar',
            categoryPercentage: 1.0,
            barPercentage: 0.7,
            label: '',
            data: data,
            backgroundColor: borderColor,
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="root">
      <h1 className="title">MultiType Chart</h1>
      {loading ? <div style={{width: '100%', height: '500px'}}>LOADING</div> : <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Bar data={data} height={500} options={options} />
      </div>}
      <div>
        <h1 style={{ border: '1px solid white' }}>
          Click here to Toggle Chart
        </h1>
      </div>
    </div>
  );
}

export default Graph;
