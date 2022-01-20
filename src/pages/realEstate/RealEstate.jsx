import React from 'react'
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  ProgressBar
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
import Navbar from '../../component/navbar/Navbar';
const RealEstate = () => {
  return (
    <>
      <Navbar/>

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
                  <h1>Curated real estate investments
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
          <Row className="justify-content-md-center" data-aos="fade-right">
            <h1 >Real estate offerings
              <br /> </h1>
            <h3 >Global real estate investments vetted by experienced professionals. </h3>
          </Row>
          <Row className="justify-content-md-center" data-aos="fade-right">
            <h2 >Current deals
              <br /> </h2>
          </Row>
          <Row className="justify-content-md-center pt-5">
          <Col xxl={4} xl={4} md={6} className="pt-5" >
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
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded5} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Litigation Funding</Card.Title>
                <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                A diversified portfolio of digital real estate NFTs across various metaverses.
                </Card.Text>
                Last donation 1w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded1} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>AlPhineX</Card.Title>
                <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                Invest in indoor snowsports resorts throughout North America!
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded2} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Insee.com</Card.Title>
                <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                A social network for newsletters, meeting new colleagues, and virtual events
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded4} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>KingsCronw</Card.Title>
                <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                The financial data platform for the online private market
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={4} xl={4} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded6} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Artisanal Funding</Card.Title>
                <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                Artisanal, luxury candy and sweet experiences for grown ups
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
        </Row>

        </Container>
      </div>
      <div className="RSI_RealEstate section__padding" id="blog">
        <Container>
          <Row className="justify-content-md-center" data-aos="fade-left">
            <h2 >Browse more deals
              <br /> </h2>
          </Row>
          <Row className="justify-content-md-center">
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded3} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>First Tokenized</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                First Tokenized Litigation Funding for one of largest US crop destructions
                </Card.Text>
                Last donation 1w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded5} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Litigation Funding</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                A diversified portfolio of digital real estate NFTs across various metaverses.
                </Card.Text>
                Last donation 1w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded1} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>AlPhineX</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                Invest in indoor snowsports resorts throughout North America!
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded2} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Insee.com</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                A social network for newsletters, meeting new colleagues, and virtual events
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded3} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>First Tokenized</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                First Tokenized Litigation Funding for one of largest US crop destructions
                </Card.Text>
                Last donation 1w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded5} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Litigation Funding</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                A diversified portfolio of digital real estate NFTs across various metaverses.
                </Card.Text>
                Last donation 1w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded1} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>AlPhineX</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                Invest in indoor snowsports resorts throughout North America!
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded2} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Insee.com</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                A social network for newsletters, meeting new colleagues, and virtual events
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded4} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>KingsCronw</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                The financial data platform for the online private market
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          <Col xxl={3} xl={3} md={6} className="pt-5" >
          <Link className='RSI__card' to={`/details?${localStorage.getItem("name")}`}>
<Card className='RSI_card_image' data-aos="zoom-in">
            <Card.Img variant="top" src={funded6} />
              <Card.Body >
                <div className='RSI__title-invest'>
                <span >Christmas Island Christmas Island</span>
                </div>
                <Card.Title className='RSI_cardTitle'>Artisanal Funding</Card.Title>
                <Card.Text xxl={3} xl={3} md={6} className='RSI_cardText'>
                Artisanal, luxury candy and sweet experiences for grown ups
                </Card.Text>
                Last donation 4w ago                
                <ProgressBar animated  variant="success" now={100} />
                <strong>$12,103 raised</strong>  of $10,000
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
            </Link>
          </Col>
          </Row>
          <Row className="justify-content-md-center pt-5">
            <p style={{ textAlign: "center" }}>Add Lazing load</p>
          </Row>
        </Container>
      </div>

      <div className='main-content'>
        <section className="py-7">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
              <Row className="row-grid justify-content-center" data-aos="flip-left">            
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