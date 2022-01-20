import { React, useEffect } from 'react';
import Title from '../../component/title/Title';
import './invertco.css';
import { logo1, logo2, funded6, funded5, funded1, funded3 } from './import';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css"

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, ProgressBar } from 'react-bootstrap';
const Invertco = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  },
    []);
  return (
    <div className="RSI_invertco section__padding" id="blog">
      {/* <div className="RSI_invertco-container_groupB">
        <div className='RSI__card'>
            <div className='RSI__card-content'>
              <h2 className='RSI_card-title'> Invert</h2>
              <p className='RSI_card-body'>
                SOmthing
              </p>
              <a href='#' className='RSI_button_more'>See more</a>
            </div>
          </div>
      </div> */}
      <Container>
        <Row  className="justify-content-md-left pt-5" data-aos="fade-right">
          <h1 >Top fundraisers<br /> </h1>
          <h3 > <a style={{ color: "green" }} href="#"><i className="fa fa-line-chart"></i></a>Most traction in 3 days</h3>
        </Row>

        <Row className="justify-content-md-center pt-5">
          <Col xxl={4} xl={4} md={6} className='pt-2'>
            <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
              <Card className='RSI_card_image' data-aos="zoom-in">
                <Card.Img variant="top" src={funded3} />
                <Card.Body >
                  <div className='RSI__title-invest'>
                    <span >Christmas Island Christmas Island</span>
                  </div>
                  <Card.Title className='RSI_cardTitle'>First Tokenized</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                    First Tokenized Litigation Funding for one of largest US crop destructions
                  </Card.Text>
                  Last donation 1w ago
                  <ProgressBar animated variant="success" now={100} />
                  <strong>$12,103 raised</strong>  of $10,000
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className='pt-2 '>
            <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
              <Card className='RSI_card_image ' data-aos="zoom-in">
                <Card.Img variant="top" src={funded6} />
                <Card.Body >
                  <div className='RSI__title-invest'>
                    <span >Christmas Island Christmas Island</span>
                  </div>
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Terraformation</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                    Hyperscaling forest restoration to reverse climate change
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className='pt-2'>
            <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
              <Card className='RSI_card_image' data-aos="zoom-in">
                <Card.Img variant="top" src={funded5} />
                <Card.Body >
                  <div className='RSI__title-invest'>
                    <span >Christmas Island Christmas Island</span>
                  </div>
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Invert destructions</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                    A social network for newsletters, meeting new colleagues, and virtual events
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={65} />
                  <strong>$12,103 raised</strong>  of $20.000
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
        </Row>
      </Container>
    </div>
  )
};

export default Invertco;
