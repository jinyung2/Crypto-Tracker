import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';

function Dashboard() {
  return (
    <Container fluid>
      <Row>NavBar goes here</Row>
      <Row>
        <Col>
          <Row>
            <Graph />
          </Row>
          <Row>Info here</Row>
        </Col>
        <Col>WatchList over here</Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
