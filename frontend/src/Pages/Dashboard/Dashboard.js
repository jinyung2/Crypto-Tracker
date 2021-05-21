import { React, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Graph from '../../Components/Graph/Graph';
import './Dashboard.css';
import DashboardNavBar from '../../Components/DashboardNavBar/DashboardNavBar';
import Info from '../../Components/Info/Info'

function Dashboard() {
  return (
    <Fragment>
      <DashboardNavBar />
      <Container fluid>
        <Row>
          <Col lg={8}>
            <Row>
              <Graph />
            </Row>
            <Row>
              <Info />
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
