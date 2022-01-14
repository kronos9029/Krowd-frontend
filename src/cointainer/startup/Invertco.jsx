import { React, useEffect } from 'react';
import Title from '../../component/title/Title';
import './invertco.css';
import { logo1,logo2, funded6, funded5, funded1 } from './import';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import "aos/dist/aos.css"

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container , Row, Col,Button } from 'react-bootstrap';
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
      <Row className="justify-content-md-center">
      <h1 >Invert Now<br /> </h1>
  <h3 > <a style={{color:"green"}} href="#"><i class="fa fa-line-chart"></i></a>Most traction in 3 days</h3>
      </Row>
      <Row className="justify-content-md-center pt-5">
      <Col xxl={4} xl={4} md={6} >
        <Link  to={`/details?${localStorage.getItem("name")}`}><Title imgUrl={funded1} logo={logo2} date="Sep 26, 2021" text="First Tokenized " des="First Tokenized Litigation Funding for one of largest US crop destructions" /> </Link>
          </Col>
      <Col xxl={4} xl={4} md={6} >
      <Title imgUrl={funded6} logo={logo1} date="Sep 26, 2021" text="Terraformation" des="
Hyperscaling forest restoration to reverse climate change" />
          </Col>
      <Col xxl={4} xl={4} md={6} >
      <Title imgUrl={funded5} logo={logo2} date="Sep 26, 2021" text="Invert destructions" des="
A social network for newsletters, meeting new colleagues, and virtual events" />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
      </Row>
      </Container>
    </div>
  )
};

export default Invertco;
