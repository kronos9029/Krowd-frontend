import { React, useEffect } from 'react';
import Title from '../../component/title/Title';
import { funded3, funded4, funded6, funded5, logo1, logo2, logo3, logo5, logo6, logo7, funded2, funded1 } from '../startup/import';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button,Card,ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';



const Fundedcompanies = () => {
  const {t , i18n} = useTranslation();
  return (
    <div className="RSI_Funded section__padding" id="regulation">
      <Container>
        <Row className="justify-content-md-center "  data-aos="fade-right">
          <h1>{t("Funded_Companies")}</h1>
          <h3 >{t("Sub_Funded_Companies")}</h3>
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
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Robo Cache</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                  Game store on the blockchain
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
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
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Care Network</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                  Decentralized Data and Finance Cloud for Enterprises
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
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
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Digital Eslipse</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                  GARI token offering—enabling crypto-powered creator economy on the Chingari App
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
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
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Thimble</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                  Live STEM classes + robotics kits to bring hands-on coding to every school
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
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
                    <span >Christmas Island Christmas Island Canned cocktails inspiring a new social scene—one sip at a time</span>
                  </div>
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Moonray</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                  Canned cocktails inspiring a new social scene—one sip at a time
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
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
                  <Card.Title className='RSI_cardTitle' xxl={4} xl={4} md={6} >Invert</Card.Title>
                  <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                  A new video game system that's redefining entertainment with family and friends
                  </Card.Text>
                  Last donation 4w ago
                  <ProgressBar animated variant="success" now={20} />
                  <strong>$12,103 raised</strong>  of $100.000
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row xxl={4} xl={4} md={6} className="justify-content-md-center pt-5">
          <Button className='buttonTest'>{t("Button_Funded_Companies")}</Button>
        </Row>
      </Container>
    </div >
  )
};

export default Fundedcompanies;
