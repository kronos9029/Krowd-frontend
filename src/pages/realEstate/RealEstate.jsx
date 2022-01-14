import React from 'react'
import {
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Link } from "react-router-dom";
import Footer from '../../component/footer/Footer';
// 
import "./realEstate.css"
// import StartupPage from '../startup/StartupPage';
import Title from '../../component/title/Title';
import '../../../src/cointainer/startup/invertco.css';
import { author, realstate, realstate2, funded1, funded2, funded4, funded6, logo6, logo4, logo3, logo2, logo1, funded5, funded3, logo7 } from '../../cointainer/startup/import';
const RealEstate = () => {
  return (
    <>
      <div className="main-content-footer-section-realstate">
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="6">
                <img
                  alt="..."
                  className="img-fluid"
                  src={realstate}
                />
              </Col>
              <Col className="order-md-1" md="6">
                <div className="pr-md-5">
                  <h1 id="i0c1" className="c-largeTitle">Curated real estate investments
                  </h1>
                  <h4>Innovative real estate investment products for growth-focused investors. </h4>
                  <p>Become an Investor</p>
                  <p>Investments can result in total loss and may be impossible to resell. <Link style={{ fontSize: "20px" }}>Learn more </Link> </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      <div className="RSI_RealEstate section__padding" id="blog">

        <Container>
          <Row className="justify-content-md-center">
            <h1 >Real estate offerings
              <br /> </h1>
            <h3 >Global real estate investments vetted by experienced professionals. </h3>
          </Row>
          <Row className="justify-content-md-center">
            <h2 >Current deals
              <br /> </h2>
          </Row>
          <Row className="justify-content-md-center pt-5">
            <Col xxl={4} xl={4} md={6} >
              <Title imgUrl={funded5} logo={logo7} date="Sep 26, 2021" text="First Tokenized" des="First Tokenized Litigation Funding for one of largest US crop destructions" />
            </Col>
            <Col xxl={4} xl={4} md={6} >
              <Title imgUrl={funded3} logo={logo1} text="Litigation Funding" des="A diversified portfolio of digital real estate NFTs across various metaverses." />
            </Col>
            <Col xxl={4} xl={4} md={6} >        <Title imgUrl={funded1} logo={logo2} text="AlPhineX" des="Invest in indoor snowsports resorts throughout North America!" />
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

        </Container>
      </div>
      <div className="RSI_RealEstate section__padding" id="blog">
        <Container>
          <Row className="justify-content-md-center">
            <h2 >Browse more deals
              <br /> </h2>
          </Row>
          <Row className="justify-content-md-center">
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded3} logo={logo1} text="Litigation Funding" des="A diversified portfolio of digital real estate NFTs across various metaverses." />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded1} logo={logo2} text="AlPhineX" des="Invest in indoor snowsports resorts throughout North America!" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded2} logo={logo3} text="Insee.com" des="A social network for newsletters, meeting new colleagues, and virtual events" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded4} logo={logo4} text="KingsCronw" des="The financial data platform for the online private market" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded6} logo={logo6} text="Artisanal Funding" des="Artisanal, luxury candy and sweet experiences for grown ups" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded2} logo={logo3} text="Insee.com" des="A social network for newsletters, meeting new colleagues, and virtual events" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded4} logo={logo4} text="KingsCronw" des="The financial data platform for the online private market" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded6} logo={logo6} text="Artisanal Funding" des="Artisanal, luxury candy and sweet experiences for grown ups" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded4} logo={logo4} text="KingsCronw" des="The financial data platform for the online private market" />
            </Col>
            <Col xxl={3} xl={3} md={6} >
              <Title imgUrl={funded6} logo={logo6} text="Artisanal Funding" des="Artisanal, luxury candy and sweet experiences for grown ups" />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <p style={{ textAlign: "center" }}>Add Lazing load</p>
          </Row>
        </Container>
      </div>

      <div className='main-content'>
        <section className="py-7">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
              <Row className="row-grid justify-content-center">            
                  <h2 id="172ymt" className='c-secondaryTitle'>
                    "
                  </h2>
                  <h3>Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world. </h3>
                </Row>
                  
                  <Row className="row-grid justify-content-center">  
                    <a>
                      <img
                        src={author}
                      />
                    </a>
                    <h4>
                      Franklin D. Roosevelt, 32nd President of the USA
                    </h4>
                  </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <div className="main-content-footer-section-realstate">
        <section className="py-6">
          <Container>
            <Row className="row-grid align-items-center">
              <Col className="order-md-2" md="5">
                <img
                  alt="..."
                  className="img-fluid"
                  src={realstate2}
                />
              </Col>
              <Col className="order-md-1" md="7">
                <Row className="row-grid justify-content-center pt-4">            
                <h1>Raise capital for your fund, project or property from retail investors
                </h1>
                  <h4>Raise up to $5 million from 1M+ people while growing your brand and engaging your community. </h4>
                  <p>Apply to Raise</p>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <Footer />
    </>
  )
}
export default RealEstate;