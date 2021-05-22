import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';
import DashboardNavBar from '../../Components/DashboardNavBar/DashboardNavBar';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import AuthContext from '../../store/AuthContext';

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

    const ctx = useContext(AuthContext);
    
    useEffect(() => {
        getWatchlist(setWatchList);
    }, []);
    
    useEffect(() => {
        getCoinInfo(coin, setCoinData);
    }, [setCoin]);
    
    function getWatchlist() {
      axios
        .get('http://localhost:5000/watchlist', {
          headers: {
            bearer: ctx.token,
          },
        })
        .then((res) => {
          setWatchList(res.data.watchlist);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function addToWatchList() {
        axios
      .post(
        `http://localhost:5000/watchlist/${coin}`,
        {},
        {
          headers: {
            bearer: ctx.token,
          },
        }
      )
      .then((res) => {
        // possibly validate res here
        setWatchList([...watchlist, coin]);
        console.log(watchlist);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeFromWatchList() {
    axios
      .delete(
        `http://localhost:5000/watchlist/${coin}`,
        {},
        {
          headers: {
            bearer: ctx.token,
          },
        }
      )
      .then(() => {
        setWatchList([...watchlist].filter((c) => c !== coin));
        console.log(watchlist);
      })
      .catch((err) => {
        console.log(err);
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
                  <button className="coin-add" onClick={addToWatchList}>
                    Add to Watchlist
                  </button>
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
            <h2>WatchList</h2>
            {watchlist ? [...watchlist].map((v, i) => <div key={i}>HELLO</div>) : <BarLoader />}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
