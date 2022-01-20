import React from 'react';
import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {
    Container, Row, Col, Button
} from 'react-bootstrap'
const Footer = () => (
    <div className="RSI__footer section__padding">
        <Container>
            <Row className="justify-content-md-center ">
                <Col   sm={12} xs={12} >
                    <h4 >Giving everyone access to early-stage startup investing <br /> All Rights Reserved</h4>
                    <hr />
                </Col>
                <Col xxl={3} xl={3}sm={6} xs={6}>
                    <h2 >For investors</h2>
                    <hr />
                    <Row><a href='#'>Why invest</a></Row>
                    <Row><a href='#'>How it works</a></Row>
                    <Row><a href='#'>FAQ</a> </Row>
                    <Row><a href='#'> Risks</a></Row>
                    <Row><a href='#'>Privacy policy</a></Row>
                </Col>
                <Col xxl={2} xl={2}sm={6} xs={6}>
                    <h2>Company</h2>
                    <hr />
                    <Row><a href='#'>For startups</a></Row>
                    <Row><a href='#'> Why raise</a></Row>
                    <Row><a href='#'>Learn</a></Row>
                    <Row><a href='#'>FAQ</a></Row>
                    <Row><a href='#'>Instruments</a></Row>
                    <Row><a href='#'>Crowd SAFE</a></Row>  
                </Col>
                <Col xxl={3} xl={3} sm={6} xs={6}>
                    <h2>Get touch</h2>
                    <hr />
                    <Row><a href='#'>Crypto</a></Row>
                    <Row><a href='#'>For investors</a></Row>
                    <Row><a href='#'>For companies</a></Row>
                    <Row><a href='#'>How it works</a></Row>
                    <Row><a href='#'>Token DPA</a></Row>
                </Col>
                <Col xxl={4} xl={4} sm={6} xs={6}>
                    <h2>Company</h2>
                    <hr />
                    <Row><a href='#'>About</a></Row>
                    <Row><a href='#'>Journal</a></Row>
                    <Row><a href='#'>Events</a></Row>
                    <Row><a href='#'>Contact</a></Row>
                    <Row><a href='#'>We're hiring!</a></Row>
                </Col>
            </Row>
            <Row className="justify-content-md-center pt-3">
                <hr />
            </Row>
            <Row className="text-center ">
                <h2>Refer a startup, get $2,500</h2>
            </Row>
            <Row className='justify-content-md-center pt-3'>
                <hr />
            </Row>
            <Row className='justify-content-md-center'>
                <p>This site (the "Site") is owned and maintained by OpenDeal Inc., which is not a registered broker-dealer. OpenDeal Inc. does not give investment advice, endorsement, analysis or recommendations with respect to any securities. All securities listed here are being offered by, and all information included on this Site is the responsibility of, the applicable issuer of such securities. The intermediary facilitating the offering will be identified in such offering’s documentation.</p>
            </Row>
            <Row className='justify-content-md-center'>
                <p>All funding-portal activities are conducted by OpenDeal Portal LLC doing business as Republic, a funding portal which is registered with the US Securities and Exchange Commission (SEC) as a funding portal (Portal) and is a member of the Financial Industry Regulatory Authority (FINRA). OpenDeal Portal LLC is located at 149 E 22rd St #2001, New York, NY 10010, please check out background on FINRA’s Funding Portal page.</p>
            </Row>
            <Row className='justify-content-md-center'>
                <p>Certain pages discussing the mechanics and providing educational materials regarding regulation crowdfunding offerings may refer to OpenDeal Broker LLC and OpenDeal Portal LLC collectively as “Republic”, solely for explanatory purposes.</p>
            </Row>
            <Row className='justify-content-md-center'>
                <p>Neither OpenDeal Inc., OpenDeal Portal LLC nor OpenDeal Broker LLC make investment recommendations and no communication, through this Site or in any other medium should be construed as a recommendation for any security offered on or off this investment platform. Investment opportunities posted on this Site are private placements of securities that are not publicly traded, involve a high degree of risk, may lose value, are subject to holding period requirements and are intended for investors who do not need a liquid investment. Past performance is not indicative of future results. Investors must be able to afford the loss of their entire investment. Only qualified investors, which may be restricted to only Accredited Investors or non-U.S. persons, may invest in offerings hosted by OpenDeal Broker.</p>
            </Row>
            <Row className='justify-content-md-center'>
                <p>All broker-dealer related securities activity is conducted by OpenDeal Broker LLC, an affiliate of OpenDeal Inc. and OpenDeal Portal LLC, and a registered broker-dealer, and member of FINRA | SiPC, located at 1245 Avenue of the Americas, 15th Floor, New York, NY 10105, please check our background on FINRA’s BrokerCheck.</p>

            </Row>
            <Row className='justify-content-md-center pt-3'>
                <p>
                    Neither OpenDeal Inc., OpenDeal Portal LLC nor OpenDeal Broker LLC, nor any of their officers, directors, agents and employees makes any warranty, express or implied, of any kind whatsoever related to the adequacy, accuracy or completeness of any information on this Site or the use of information on this site. Offers to sell securities can only be made through official offering documents that contain important information about the investment and the issuers, including risks. Investors should carefully read the offering documents. Investors should conduct their own due diligence and are encouraged to consult with their tax, legal and financial advisors.<br />
                </p>
                <p>
                    By accessing the Site and any pages thereof, you agree to be bound by the OpenDeal Portal’s Terms of Use and Privacy Policy and/or OpenDeal Broker’s Terms of Use and Privacy Policy. Please also see OpenDeal Broker’s Business Continuity Plan and Additional Risk Disclosures. All issuers offering securities under regulation crowdfunding as hosted by OpenDeal Portal LLC are listed on the All Companies Page. The inclusion or exclusion of an issuer on the Platform Page and/or Republic’s Homepage, which includes offerings conducted under regulation crowdfunding as well as other exemptions from registration, is not based upon any endorsement or recommendation by OpenDeal Inc, OpenDeal Portal LLC, or OpenDeal Broker LLC, nor any of their affiliates, officers, directors, agents, and employees. Rather, issuers of securities may, in their sole discretion, opt-out of being listed on the Platform Page and Homepage.
                </p>
            </Row>
            <Row className='justify-content-md-center'>
                <p>         Investors should verify any issuer information they consider important before making an investment.
                </p>
            </Row>
            <Row className='justify-content-md-center'>
                <p>
                    Investments in private companies are particularly risky and may result in total loss of invested capital. Past performance of a security or a company does not guarantee future results or returns. Only investors who understand the risks of early stage investment and who meet the Republic's investment criteria may invest.
                </p>
                <br />
                <p>
                    Neither OpenDeal Inc., OpenDeal Portal LLC nor OpenDeal Broker LLC verify information provided by companies on this Site and makes no assurance as to the completeness or accuracy of any such information. Additional information about companies fundraising on the Site can be found by searching the EDGAR database, or the offering documentation located on the Site when the offering does not require an EDGAR filing.
                </p>
            </Row>
            <Row className='justify-content-md-center'>
                <hr />
            </Row>
            <Row className='justify-content-md-center'>

            </Row>
            <Row className='justify-content-md-center'>

            </Row>
        </Container>
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">Copyright &copy; 2022 Made in by 7 Bee
                    </p>
                </div>
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="social-icons">
                        <li><a href='#' className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href='#' className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href='#' className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
                        <li><a href='#' className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;
