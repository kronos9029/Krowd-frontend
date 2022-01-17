import { React, useEffect, useState } from 'react';
import Title from '../../component/title/Title';
import '../../../src/cointainer/startup/invertco.css';
import { funded1, funded2, funded3, funded4, funded6, logo1, logo2, logo3, logo4, logo6 } from '../../cointainer/startup/import';
import Footer from '../../component/footer/Footer';
import {
  Container, Row, Col, Button, Card, ProgressBar
} from "react-bootstrap"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Navbar from '../../component/navbar/Navbar';

const StartupPage = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(6);

  const showMoreItems =() => {
      setVisible((prevValue) => prevValue + 5)
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json()).then((data) => setItems(data));
  }, []);
  return (
    <>
      <Navbar />

      <div className="RSI_invertco section__padding" id="blog">

        <Container>
          <Row className="justify-content-md-center">
            <h1 >Invert Now<br /> </h1>
            <h3 > <a style={{ color: "green" }} href="#"><i class="fa fa-line-chart"></i>
            </a>Browse current investment opportunities on Republic.</h3>
            <h3>All companies are vetted & pass due diligence. </h3>
          </Row>

          <Row xxl={3} xl={3} md={2} className="justify-content-md-center pt-5 ">
            {/* <Col xxl={4} xl={4} md={6} className="pt-5" > */}
                {items.slice(0 , visible).map((item) => (
          <Link to={`/details?${localStorage.getItem("name")}`}>
                  <Card className='RSI_card_image ml-3' data-aos="zoom-in">
                    <Card.Img variant="top" src={funded1} />
                    <Card.Body >
                      <div className='RSI__title-invest'>
                        <span >Christmas Island Christmas Island</span>
                      </div>
                      <Card.Title xxl={4} xl={4} md={6} className='RSI_cardTitle'>{item.title}</Card.Title>
                      <Card.Text xxl={4} xl={4} md={6} className='RSI_cardText'>
                      {item.body}
                      </Card.Text>
                      Last donation 4w ago
                      <ProgressBar animated variant="success" now={100} />
                      <strong>$12,103 raised</strong>  of $10,000
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
          </Link>
                ))}
            {/* </Col> */}
          </Row>
          <Row xxl={4} xl={4} md={6} className="justify-content-md-center pt-5">
            <Button onClick={showMoreItems} style={{ textAlign: "center" }}>Load More</Button>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  )
};

export default StartupPage;
