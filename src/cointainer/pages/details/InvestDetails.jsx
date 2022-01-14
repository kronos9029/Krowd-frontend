import React, {useState} from 'react'
import Footer from '../../../component/footer/Footer'
import {
    Container, Row, Col, Button,Collapse
} from "react-bootstrap";
import { funded1 } from '../../../../src/cointainer/startup/import';

export default function InvestDetails() {
    const [open, setOpen] = useState(false);

    return (
        <>

            <div>
                <div className="RSI_invertco section__padding" id="blog">

                    <Container>
                        <Row className="justify-content-md-center">
                            <h1 >Realm Metaverse Real Estate<br /> </h1>
                            <p >BA diversified portfolio of digital real estate NFTs across various metaverses.</p>
                        </Row>

                        <Row className="justify-content-md-center pt-5">
                            <Col xxl={6} xl={4} md={6} >
                                {/* <Title imgUrl={funded1} logo={logo2} text="AlPhineX" des="Invest in indoor snowsports resorts throughout North America!" /> */}
                                <img className='w-100' src={funded1} />
                            </Col>
                            <Col xxl={6} xl={4} md={6} >
                                {/* <Title imgUrl={funded1} logo={logo2} text="AlPhineX" des="Invest in indoor snowsports resorts throughout North America!" /> */}
                                <Container className='pl-3 '>
                                    <Button className='btn btn-success'> FULLY RESERVED</Button>
                                    <div className='text-success #19C157'><h1>$75,000,000</h1> </div>
                                    <p>Offering fully reserved</p>
                                    <hr />

                                    <h1>15,768</h1>
                                    <p>Reservations</p>
                                    <hr />
                                    <h3>
                                        Join the waitlist for a chance to invest if room in the offering becomes available.
                                    </h3>
                                    <Row className='pt-4 pb-4'><Button className='w-25'>Join with me</Button></Row>
                                    <p>$1,000 minimum investment </p>
                                </Container>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center pt-5">
                            <Col xxl={1} xl={4} md={6} >
                                <Button
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                    Pitch
                                </Button>
                                <Collapse in={open}>
                                    <div id="example-collapse-text ">
                                       <h2 className='pt-3'>Highlights</h2>
                                       <ul>
                                           <li className='w-100'> A diversified portfolio of digital assets across 13 metaverses</li>
                                           <li className='w-100'> A diversified portfolio of digital assets across 13 metaverses</li>
                                           <li className='w-100'> A diversified portfolio of digital assets across 13 metaverses</li>
                                           <li className='w-100'> A diversified portfolio of digital assets across 13 metaverses</li>
                                           <li className='w-100'> A diversified portfolio of digital assets across 13 metaverses</li>
                                         
                                       </ul>
                                    </div>
                                </Collapse>
                            </Col>
                            <Col xxl={1} xl={4} md={6} >
                                <p>Pitch</p>
                            </Col>
                            <Col xxl={1} xl={4} md={6} >
                                <p>Pitch</p>
                            </Col>
                            <Col xxl={9} xl={4} md={6} >
                                <p>Pitch</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        </>
    )
}
