import { React, useEffect } from 'react';
import Title from '../../component/title/Title';

import { funded1, funded2, funded3, funded4, funded5, funded6, logo1, logo2, logo3, logo4, logo6, logo7 } from '../startup/import';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container , Row, Col,Button } from 'react-bootstrap';


const RegulationCrowdfunding = () => {
  return (
    <div className="RSI_Regulation section__padding" id="regulation">
      <Container>
      <Row className="justify-content-md-center">
      <h3 > <a style={{ color: "green" }} href="#"><i class="fa fa-check"></i>
        </a>All Regulation Crowdfunding deals are highly vetted by our <a href='#'>investment team.</a></h3>
        </Row>
        <Row className="justify-content-md-center pt-5">
          <Col xxl={4} xl={4} md={6} >
          <Title imgUrl={funded3} logo={logo7} date="Sep 26, 2021" text="First Tokenized" des="First Tokenized Litigation Funding for one of largest US crop destructions" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
          <Title imgUrl={funded5} logo={logo1} text="Litigation Funding" des="A diversified portfolio of digital real estate NFTs across various metaverses." />
          </Col>
          <Col xxl={4} xl={4} md={6} >
          <Title imgUrl={funded1} logo={logo2} text="AlPhineX" des="Invest in indoor snowsports resorts throughout North America!" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
          <Title imgUrl={funded2} logo={logo3} text="Insee.com" des="A social network for newsletters, meeting new colleagues, and virtual events" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
          <Title imgUrl={funded4} logo={logo4} text="KingsCronw" des="The financial data platform for the online private market" />
          </Col>
          <Col xxl={4} xl={4} md={6} >
          <Title imgUrl={funded6} logo={logo6} text="Artisanal Funding" des="Artisanal, luxury candy and sweet experiences for grown ups" />
          </Col>
        </Row>
        <Row xxl={4} xl={4} md={6} className="justify-content-md-center">
            <Button >View more</Button>
        </Row>
      </Container>
</div>
   

  )
};

export default RegulationCrowdfunding;
