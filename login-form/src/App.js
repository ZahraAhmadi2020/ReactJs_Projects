
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import Login from './components/Login/Login';
import { Row, Col } from 'react-bootstrap'
function App() {
  return (
    <Fragment>
      <Row className='p-5'>
        <Col xs={0} md={2} lg={4}></Col>
        <Col xs={12}md={8} lg={4}><Login/></Col>
        <Col xs={0} md={2} lg={4}></Col>
      </Row>

      <p className='text-light'>Zahra Ahmadi</p>

    </Fragment>
  );
}

export default App;


// create wizard form for signup soon
