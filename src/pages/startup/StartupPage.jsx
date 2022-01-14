import { React, useEffect } from 'react';
import Title from '../../component/title/Title';
import '../../../src/cointainer/startup/invertco.css';
import { funded1, funded2, funded3, funded4, funded6, logo1, logo2, logo3, logo4, logo6 } from '../../cointainer/startup/import';
import Footer from '../../component/footer/Footer';
import {
  Container, Row, Col, Button
} from "react-bootstrap"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const StartupPage = () => {

  return (
    <>
      <div className="RSI_invertco section__padding" id="blog">

        <Container>
          <Row className="justify-content-md-center">
            <h1 >Invert Now<br /> </h1>
            <h3 > <a style={{ color: "green" }} href="#"><i class="fa fa-line-chart"></i>
            </a>Browse current investment opportunities on Republic. All companies are vetted & pass due diligence.</h3>
          </Row>
          <Row className="justify-content-md-center pt-5">
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
            <Col xxl={4} xl={4} md={6} >
              <Title imgUrl={funded3} logo={logo1} text="Litigation Funding" des="A diversified portfolio of digital real estate NFTs across various metaverses." />
            </Col>
          </Row>
          <Row xxl={4} xl={4} md={6}  className="justify-content-md-center">
            <p style={{ textAlign: "center" }}>Add Lazing load</p>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
};

export default StartupPage;
