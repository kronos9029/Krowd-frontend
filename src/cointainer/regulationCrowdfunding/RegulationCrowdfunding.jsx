import { React, useEffect } from 'react';
import Title from '../../component/title/Title';

import { funded1, funded2, funded3, funded4, funded5, funded6, logo1, logo2, logo3, logo4, logo6, logo7 } from '../startup/import';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Container , Row, Col,Button,Card,ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const RegulationCrowdfunding = () => {
  return (
    <div className="RSI_Regulation section__padding" id="regulation">
      <Container>
      <Row className="justify-content-md-center"  data-aos="fade-right">
      <h3 > <a style={{ color: "green" }} href="#"><i class="fa fa-check"></i>
        </a>All Regulation Crowdfunding deals are highly vetted by our <a href='#'>investment team.</a></h3>
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
        <Row xxl={4} xl={4} md={6} className="justify-content-md-center pt-5">
            <Button >View more</Button>
        </Row>
      </Container>
</div>
   

  )
};

export default RegulationCrowdfunding;
