import React, { useState } from 'react'
import { Button, Row, Col,Accordion } from 'react-bootstrap';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { logoTest } from '../../cointainer/startup/import';
// import logo from '';
import './navbar.css';
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className="RSI__navbar_control">
            <div className="RSI__navbar">
                <div className="RSI__navbar-links">
                    <div className="RSI__navbar-links_logo">
                        {/* <img src={logo} /> */}
                        <h1><Link to="/">SRI</Link> </h1>
                    </div>
                    {/* <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}
                    <div className="dropdown">
                        <h3 className="dropbtn">Discover</h3>
                        <div className="dropdown-content">
                            <Row>
                                {/* <img src={logoTest}/> */}
                                  <p><Link to="/">Home</Link> </p>
                              <p>What is RSI?</p>
                                <p> Why inverts?</p>
                               <p><a href="#features">Case Studies</a></p>
                                <p><Link to="/real-estate">Real estate</Link> </p>
                                 <p><Link to="/companies">Startup</Link> </p>
                            </Row>
                        </div>
                    </div>
                    <div className="dropdown">
                        <h3 className="dropbtn">Learn</h3>
                        <div className="dropdown-content-learn">
                            <a href="#">What is RSI?</a>
                            <a href="#">Why invest</a>
                            <a href="#">Case Studies</a>
                            <a href="#">FAQ</a>
                        </div>
                    </div>

                </div>
                <div className="RSI__navbar-sign">
                    <p>About</p>
                    <Link to="/login"><p>Sign in </p></Link>
                    <Link to="/register"><p id="Sign">Sign up</p></Link>

                </div>
                <div className="RSI__navbar-menu">
                    {toggleMenu
                        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                    {toggleMenu && (
                        <div className="RSI__navbar-menu_container scale-up-center">
                            {/* <div className="RSI__navbar-menu_container-links">
                                <p><a href="#home">Home</a></p>
                                <p><a href="#wRSI">What is RSI?</a></p>
                                <p>Why inverts</a></p>
                                <p><a href="#features">Case Studies</a></p>
                                <p><a href="#invertco">Library</a></p>
                            </div> */}
                            <div className="RSI__navbar-menu_container-links-sign">
                                <p>About</p>
                                <Link to="/login"><button type="button">Login</button></Link>
                                <Link to="/register"><button type="button">Sign up</button></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar

