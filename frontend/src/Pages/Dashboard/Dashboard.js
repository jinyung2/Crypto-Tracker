import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';
import DashboardNavBar from '../../Components/DashboardNavBar/DashboardNavBar';
import { BarLoader } from 'react-spinners';
import axios from 'axios';

function getCoinInfo(name, setFn) {
  axios.get(`http://localhost:5000/coin/${name}`).then((res) => {
    setFn(res.data);
  });
}

function getWatchlist() {
    axios.get('http://localhost:5000/watchlist', {
        'bearer': localStorage.getItem('token')
    }).then((res) => {
        console.log(res);
    })
}

function Dashboard() {
  const [coin, setCoin] = useState('dogecoin');
  // coinData for the current price, name display
  const [coinData, setCoinData] = useState(null);
  const [watchlist, setWatchList] = useState(null);

  useEffect(() => {
    getCoinInfo(coin, setCoinData);
  }, [setCoin]);

  function addToWatchList(coin) {
    axios.post(`http://localhost:5000/watchlist/${coin}`, {}, 
    {
        'bearer': localStorage.getItem('token')
    }).then((res) => {
        // possibly validate res here
        setWatchList([...watchlist, coin]);
    }).catch((err) => {
        alert('Failed to add to watchlist!')
    });
  }

  return (
    <Fragment>
      <DashboardNavBar />
      <Container fluid>
        <Row>
          <Col xl={8}>
            <Row>
              {coinData ? (
                <div className="coin-container">
                  <div className="coin-title-price">
                    <div className="coin-title">
                      {coinData.name}: {coinData.symbol}
                    </div>
                    <div className="coin-price">${+coinData.priceUsd}</div>
                  </div>
                  <button className="coin-add" onClick={addToWatchList}>Add to Watchlist</button>
                </div>
              ) : (
                <div className="coin-container">
                  <BarLoader width={300} color="#fff" />
                </div>
              )}
              <Graph coin={coin} />
            </Row>
            <Row>
              <h1>Info here</h1>
            </Row>
          </Col>
          <Col lg>
            <h1>WatchList over here</h1>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
