import React from 'react'
import {
  Container,
  Row, Badge,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// 
const FooterSection = () => {
  return (
    <div className="main-content-footer-section">
      <section className="py-6">
        <Container>
          <h1 className="gradient__text">Smart way to raise money
          </h1>
          <h4>Republic is a leading private investment platform
          </h4>
          <hr />
          <Row className="row-grid align-items-center">
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h1></h1>
                <p>
                </p>
                <ul className="list-unstyled mt-5">
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                          <i className="ni ni-settings-gear-65" />
                      </div>
                      <div>
                        <h4 className="mb-0">Raise up to $1M of founder-friendly capital</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                          <i className="ni ni-html5" />
                      </div>
                      <div>
                        <h4 className="mb-0">Drive key metrics and market your business</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                          <i className="ni ni-satisfied" />
                      </div>
                      <div>
                        <h4 className="mb-0">Build a loyal army of evangelists and fans</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                          <i className="ni ni-satisfied" />
                      </div>
                      <div>
                        <h4 className="mb-0">Average raise: $500,000+ from 1,500+ investors*</h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="d-flex align-items-center">
                      <div>
                          <i className="ni ni-satisfied" />
                      </div>
                      <div>
                        <h4 className="mb-0">90%+ success rate since 2016</h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col className="order-md-1" md="6">
              <div className="pr-md-5">
                <h1>Lovable widgets and cards</h1>
                <p>
                  We love cards and everybody on the web seems to. We have
                  gone above and beyond with options for you to organise your
                  information. From cards designed for content, to pricing
                  cards or user profiles, you will have many options to choose
                  from.
                </p>
                <p>
                  Exactly what founders need to be ful
                  Desiree Vargas Wrigley, Pearachute
                </p>
                <div
                  className="font-weight-bold text-info mt-5"
                  to="/admin/widgets"
                >
                  Explore widgets
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
export default FooterSection;