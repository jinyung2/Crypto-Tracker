import React, { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';
import DashboardNavBar from '../../Components/DashboardNavBar/DashboardNavBar';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import Info from '../../Components/Info/Info'

function getCoinInfo(name, setFn) {
  axios.get(`http://localhost:5000/coin/${name}`).then((res) => {
    setFn(res.data);
  });
}

function Dashboard() {
  const [coin, setCoin] = useState('dogecoin');
  // coinData for the current price, name display
  const [coinData, setCoinData] = useState(null);
  const [watchlist, setWatchList] = useState(null);

  useEffect(() => {
    getCoinInfo(coin, setCoinData);
  }, [setCoin]);

  return (
    <Fragment>
      <DashboardNavBar />
      <Container fluid>
        <Row>
          <Col lg={8}>
            <Row>
              {coinData ? (
                <div className="coin-container">
                  <div className="coin-title">
                    {coinData.name}: {coinData.symbol}
                  </div>
                  <div className="coin-price">${+coinData.priceUsd}</div>
                </div>
              ) : (
                <div className="coin-container">
                  <BarLoader width={300} color="#fff" />
                </div>
              )}
              <Graph coin={coin} />
            </Row>
            <Row>
              <Info coin={coin}/>
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
