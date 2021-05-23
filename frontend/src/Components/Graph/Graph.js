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
        color: 'rgba(108, 122, 137, 1)',
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
    const [interval, setInterval] = useState('h6');

    useEffect(() => {
        getHistoryData(props.coin, interval);
    }, [interval]);

    function changeInterval(i) {
        setLoading(true);
        setInterval(i);
    }

    function getHistoryData(coin, inter) {
        setLoading(true);
        const diff = inter == 'm1' || inter == 'm5' ? 20 : 10;
        axios.get(`http://localhost:5000/coin/${coin}/${inter}`).then((res) => {
          const graphData = res.data.data
            .filter((val, i, arr) => i % diff === 0 || i === arr.length - 1)
            .map((data, i, arr) =>
              i > 0
                ? [+arr[i - 1].priceUsd, +arr[i].priceUsd]
                : [0, +arr[i].priceUsd]
            ).slice(1);
    
          const labels = new Array(graphData.length).fill('');
    
          let borderColor = ['rgba(0, 177, 106, 1)'];
          for (let i = 1; i < graphData.length; i++) {
            borderColor.push(
              graphData[i][0] > graphData[i][1] ? 'rgba(210, 77, 87, 1)' : 'rgba(0, 177, 106, 1)'
            );
          }
          const min = graphData.flatMap((e) => e).reduce((a, b) => Math.min(a, b));
          const max = graphData.flatMap((e) => e).reduce((a, b) => Math.max(a, b));
          options = {
            ...options,
            scales: {
              ...options.scales,
              yAxes: { ...options.scales.yAxes, min: min, max: max },
            },
          };
          setData({
            labels: labels,
            datasets: [
              {
                type: 'bar',
                categoryPercentage: 1.0,
                barPercentage: 0.75,
                label: '',
                data: graphData,
                backgroundColor: borderColor,
                borderWidth: 1,
              },
            ],
          });
        }).then(() => {
            setLoading(false);
        });
    }

  return (
    <div className="root">
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
          <ScaleLoader width={7} color="#fff" />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Bar data={data} height={500} options={options} />
        </div>
      )}
      <div className="history-container">
        <div onClick={() => changeInterval('m1')} className={interval == 'm1' ? "history-button active" : "history-button"}>1 DAY</div>
        <div onClick={() => changeInterval('m5')} className={interval == 'm5' ? "history-button active" : "history-button"}>5 DAYS</div>
        <div onClick={() => changeInterval('m15')} className={interval == 'm15' ? "history-button active" : "history-button"}>7 DAYS</div>
        <div onClick={() => changeInterval('m30')} className={interval == 'm30' ? "history-button active" : "history-button"}>14 DAYS</div>
        <div onClick={() => changeInterval('h1')} className={interval == 'h1' ? "history-button active" : "history-button"}>1 MONTH</div>
        <div onClick={() => changeInterval('h2')} className={interval == 'h2' ? "history-button active" : "history-button"}>2 MONTH</div>
        <div onClick={() => changeInterval('h6')} className={interval == 'h6' ? "history-button active" : "history-button"}>6 MONTH</div>
        <div onClick={() => changeInterval('h12')} className={interval == 'h12' ? "history-button active" : "history-button"}>1 YEAR</div>
        <div onClick={() => changeInterval('d1')} className={interval == 'd1' ? "history-button active" : "history-button"}>2 YEAR</div>
      </div>
    </div>
  );
}

export default React.memo(Graph);
