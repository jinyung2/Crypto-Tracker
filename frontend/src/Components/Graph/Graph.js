import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';
import './Graph.css';

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
            size: 15,
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
            size: 10,
          },
        },
      },
    },
  };

function Graph(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const diff = 50;
useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/coin/${props.coin}/m1`).then((res) => {
        const labels = res.data.data
        .map((data, i) => '')
        .filter((val, i, arr) => (i > 0 && ((i % diff) === 0)) || (i === arr.length - 1));

        const graphData = res.data.data
        .map((data, i, arr) =>
        i >= diff
        ? [+arr[i - diff].priceUsd, +arr[i].priceUsd]
        : [0, +data.priceUsd]
        )
        .filter((val, i, arr) => (i > 0 && i % diff === 0) || (i === arr.length - 1));

        console.log(graphData);

        let borderColor = ['rgba(0, 177, 106, 1)'];
        for (let i = 1; i < graphData.length; i++) {
            borderColor.push(graphData[i][0] > graphData[i][1] ? 'red' : 'rgba(0, 177, 106, 1)');
        }
        const min = graphData.flatMap(e => e).reduce((a,b) => Math.min(a,b));
        const max = graphData.flatMap(e => e).reduce((a,b) => Math.max(a,b));
        options = {...options, scales: {...options.scales, yAxes: {...options.scales.yAxes, min: min * 0.95, max: max * 1.05}}};
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
            data: graphData,
            backgroundColor: borderColor,
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    });
  }, [setData]);

  return (
    <div className="root">
      {loading ? <div className='loading'><h1>Loading...</h1><ScaleLoader width={7} color='#fff'/></div> : <div style={{ display: 'flex', justifyContent: 'center' }}>
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
