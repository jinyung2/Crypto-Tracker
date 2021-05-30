import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';
import DashboardNavBar from '../../Components/DashboardNavBar/DashboardNavBar';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import AuthContext from '../../store/AuthContext';
import Watchlist from '../../Components/Watchlist/Watchlist';
import Info from '../../Components/Info/Info';

function getCoinInfo(name, setFn, setLoading) {
  axios
    .get(`http://localhost:5000/coin/${name}`)
    .then((res) => {
      setFn(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
}

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [coinData, setCoinData] = useState(null);
  const [watchlist, setWatchList] = useState(null);
  const [graphType, setGraphType] = useState(true);

  const ctx = useContext(AuthContext);

  useEffect(() => {
    getWatchlist();
  }, []);

  // using this function re-renders all other necessary data on page.
  function changeCoin(coin) {
    setLoading(true);
    getCoinInfo(coin, setCoinData, setLoading);
  }

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
      .then(() => {
        return watchlist && watchlist.length > 0 ? watchlist[0] : 'dogecoin';
      })
      .then((coin) => {
        getCoinInfo(coin, setCoinData, setLoading);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addToWatchList() {
    axios
      .post(
        `http://localhost:5000/watchlist/${coinData.id}`,
        {},
        {
          headers: {
            bearer: ctx.token,
          },
        }
      )
      .then((res) => {
        // possibly validate res here
        if (watchlist.indexOf(coinData.id) < 0) {
          setWatchList([...watchlist, coinData.id]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeFromWatchList(coin) {
    axios
      .delete(`http://localhost:5000/watchlist/${coin}`, {
        headers: {
          bearer: ctx.token,
        },
      })
      .then(() => {
        setWatchList([...watchlist].filter((c) => c !== coin));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function graphTypeToggler() {
    setGraphType(!graphType);
  }

  return (
    <Fragment>
      <DashboardNavBar change={changeCoin} />
      <Container fluid>
        <Row>
          <Col xl={8}>
            <Row>
              {!loading && coinData ? (
                <div className="header-container">
                  <div className="coin-title-price">
                    <div className="title coin-title">
                      {coinData.name}: {coinData.symbol}
                    </div>
                    <div className="coin-price">${+coinData.priceUsd}</div>
                  </div>
                  <button className="coin-add" onClick={addToWatchList}>
                    Add to Watchlist
                  </button>
                </div>
              ) : (
                <div className="header-container">
                  <BarLoader width={300} color="#fff" />
                </div>
              )}
              {coinData && (
                <Graph
                  graphType={graphType}
                  changeType={graphTypeToggler}
                  key={coinData.id}
                  coin={coinData.id}
                />
              )}
            </Row>
            <Row>
              {coinData && <Info key={coinData.id} coin={coinData.id} />}
            </Row>
          </Col>
          <Col xl={4}>
            <div className="header-container title watchlist-title">
              WatchList
            </div>
            <div className="watchlist">
              {watchlist && watchlist.length > 0 ? (
                [...watchlist].map((v, i) => (
                  <Watchlist
                    key={v}
                    coin={v}
                    changeCoin={changeCoin}
                    remove={removeFromWatchList}
                  />
                ))
              ) : (
                <div>HELLO PUT EMPTY LIST PLACEHOLDER HERE!</div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
