import React from 'react'
import {
    Container,
    Row,
    Col,
    UncontrolledTooltip,
  } from "reactstrap";
  import './collabration.css';

const Collabration = () => {
    return (
        <div className='main-content'>
            <section className="py-7">
          <Container>
            <Row className="row-grid justify-content-center">
              <Col className="text-center" lg="8">
                <div className="text-center">
                  <h2 className="display-3 ">
                  Access private investments
                  </h2>
                  <p>Invest alongside leading venture capitalists and professional investors. </p>
                  <Row className="justify-content-center">
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=adpr-index-page"
                        id="tooltip170669606"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle shadow shadow-lg--hover"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/bootstrap.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip170669606">
                        Bootstrap 4 - Most popular front-end component library
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpr-index-page"
                        id="tooltip374813715"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813715">
                        React - A JavaScript library for building user
                        interfaces
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-nodejs?ref=adpr-index-page"
                        id="tooltip374813716"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nodejs-logo.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813716">
                        Node.js - a JavaScript runtime built on Chrome's V8
                        JavaScript engine
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-laravel?ref=adpr-index-page"
                        id="tooltip374813717"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/laravel_logo.png"
                          style={{ backgroundColor: "white" }}
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip374813717">
                        Laravel - The PHP Framework For Web Artisans
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=adpr-index-page"
                        id="tooltip616015001"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip616015001">
                        Vue.js - The progressive javascript framework
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-angular?ref=adpr-index-page"
                        id="tooltip211254026"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip211254026">
                        Angular - One framework. Mobile & desktop
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpr-index-page"
                        id="tooltip82987604"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/sketch.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip82987604">
                        Sketch - Digital design toolkit
                      </UncontrolledTooltip>
                    </Col>
                    <Col className="my-2" md="2" xs="3">
                      <a
                        href="https://www.adobe.com/products/photoshop.html?ref=creative-tim"
                        id="tooltip731835410"
                        target="_blank"
                      >
                        <img
                          alt="..."
                          className="img-fluid rounded-circle opacity-3"
                          src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/ps.jpg"
                        />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip731835410">
                        Adobe Photoshop - Software for digital images
                        manipulation
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        </div>
    )
}
export default Collabration;
