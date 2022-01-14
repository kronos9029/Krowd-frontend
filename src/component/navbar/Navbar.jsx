import React, { useState } from 'react'
import { Button, Row ,Col} from 'react-bootstrap';
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
                    <div class="dropdown">
                        <h2 class="dropbtn">Invest</h2>
                        <div class="dropdown-content">
                            <Row>
                            <Col xxl={4} xl={3} md={6} >
                                {/* <img src={logoTest}/> */}
                            <a>  <p><Link to="/">Home</Link> </p></a>
                                </Col>
                            <Col xxl={4} xl={3} md={6} >
                            <a>  <p><a style={{ textDecoration: "none" }} href="#wRSI">What is RSI?</a></p></a>
                                </Col>
                                <Col xxl={4} xl={3} md={6} >
                            <a>  <p><a style={{ textDecoration: "none" }} href="#wIns">Why inverts?</a></p></a>
                                </Col>
                                <Col xxl={4} xl={3} md={6} >
                            <a>  <p><a style={{ textDecoration: "none" }} href="#features">Case Studies</a></p></a>
                                </Col>
                                <Col xxl={4} xl={3} md={6} >
                            <a>  <p><Link to="/real-estate">Real estate</Link> </p></a>
                                </Col>
                                <Col xxl={4} xl={3} md={6} >
                                <a>  <p><Link to="/companies">Startup</Link> </p></a>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </div>
                <div className="RSI__navbar-sign">
                    <p>About</p>
                    <button type="button">Login</button>
                </div>
                <div className="RSI__navbar-menu">
                    {toggleMenu
                        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                    {toggleMenu && (
                        <div className="RSI__navbar-menu_container scale-up-center">
                            <div className="RSI__navbar-menu_container-links">
                                <p><a href="#home">Home</a></p>
                                <p><a href="#wRSI">What is RSI?</a></p>
                                <p><a href="#wIns">Why inverts</a></p>
                                <p><a href="#features">Case Studies</a></p>
                                <p><a href="#invertco">Library</a></p>
                            </div>
                            <div className="RSI__navbar-menu_container-links-sign">
                                <p>About</p>
                                <button type="button">Login</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar

