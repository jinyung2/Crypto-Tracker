import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';
import DashboardNavBar from "../../Components/DashboardNavBar/DashboardNavBar";

function Dashboard() {
  return (
    <Container fluid>
      <Row><DashboardNavBar /></Row>
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
