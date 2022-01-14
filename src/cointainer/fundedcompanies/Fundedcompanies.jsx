import { React, useEffect } from 'react';
import Title from '../../component/title/Title';
import { funded3, funded4, funded6, funded5, logo1, logo2, logo3, logo5, logo6, logo7, funded2, funded1 } from '../startup/import';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';



const Fundedcompanies = () => {


  return (
    <div className="RSI_Funded section__padding" id="regulation">
      <Container>
        <Row className="justify-content-md-center">
          <h1> Funded Companies</h1>
          <h3 >90% of Republic campaigns have been successfully funded</h3>
        </Row>
        <Row className="justify-content-md-center pt-5">
          <Col xxl={4} xl={4} md={6} >
            <Title imgUrl={funded3} logo={logo1} date="Sep 26, 2021" text="Robo Cache" des="
Game store on the blockchain" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
            <Title imgUrl={funded4} logo={logo2} text="Care Network" des="
Decentralized Data and Finance Cloud for Enterprises" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
            <Title imgUrl={funded6} logo={logo3} text="Digital Eslipse" des="
GARI token offering—enabling crypto-powered creator economy on the Chingari App" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
            <Title imgUrl={funded2} logo={logo7} text="Thimble" des="Live STEM classes + robotics kits to bring hands-on coding to every school" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
            <Title imgUrl={funded1} logo={logo5} text="Moonray" des="Canned cocktails inspiring a new social scene—one sip at a time" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
            <Title imgUrl={funded5} logo={logo6} text="Invert" des="
A new video game system that's redefining entertainment with family and friends"/>
          </Col>
        </Row>
        <Row xxl={4} xl={4} md={6} className="justify-content-md-center">
          <Button className='buttonTest'>View All Funded</Button>
        </Row>
      </Container>
    </div >
  )
};

export default Fundedcompanies;
