import React, { useState } from 'react'
import { Button, Row, Col, Accordion } from 'react-bootstrap';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { logoTest } from '../../cointainer/startup/import';
import { useTranslation } from 'react-i18next';
import '../../../src/pages/i18n'

// import logo from '';
import './navbar.css';
const Navbar = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        return () => {
            i18n.changeLanguage(lang)
            console.log(`Lang change to ${lang}`);
        };
    }
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <div className="RSI__navbar_control">
            <div className="RSI__navbar">
                <div className="RSI__navbar-links">
                    <div className="RSI__navbar-links_logo">
                        <h1><Link to="/">SRI</Link> </h1>
                    </div>
                    <div className="dropdown">
                        <h3 className="dropbtn">{t("Discover")}</h3>
                        <div className="dropdown-content">
                            <Row>
                                {/* <img src={logoTest}/> */}
                                <p><Link to="/">{t("Home")}</Link> </p>
                                <p>{t("What is RSI?")}</p>
                                <p> {t("Why inverts?")}</p>
                                <p><a href="#features">{t("Case Studies")}</a></p>
                                <p><Link to="/real-estate">{t("Real estate")}</Link> </p>
                                <p><Link to="/companies">{t("Startup")}</Link> </p>
                            </Row>
                        </div>
                    </div>
                    <div className="dropdown">
                        <h3 className="dropbtn">{t("Learn")}</h3>
                        <div className="dropdown-content-learn">
                            <a href="#">{t("What is RSI?")}</a>
                            <a href="#">{t("Why inverts?")}</a>
                            <a href="#">{t("Case Studies")}</a>
                            <a href="#">FAQ</a>
                        </div>
                    </div>
                    <div className="dropdown2">
                    <i className="fa fa-globe"> <h3 className="dropbtn">{t("Language")}</h3></i>
                        <div className="dropdown-content-learn">
                            <button onClick={changeLanguage("en")}> English</button>
                            <button onClick={changeLanguage("vn")}> VietNamese</button>
                        </div>
                    </div>

                </div>

                <div className="RSI__navbar-sign">
                    <p>{t("About")}</p>
                    <Link to="/login"><p>{t("login")} </p></Link>
                    <Link to="/register"><p id="Sign">{t("signup")}</p></Link>

                </div>
                <div className="RSI__navbar-menu">
                    {toggleMenu
                        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                    {toggleMenu && (
                        <div className="RSI__navbar-menu_container scale-up-center">
                            <div className="RSI__navbar-menu_container-links">
                                <div className="dropdown">
                                    <h3 className="dropbtn">{t("Language")}</h3>
                                    <div className="dropdown-content-learn">
                                        <button onClick={changeLanguage("en")}> English</button>
                                        <button onClick={changeLanguage("vn")}> VietNamese</button>
                                    </div>
                                </div>
                            </div>

                            <div className="RSI__navbar-menu_container-links-sign">
                                <p>{t("About")}</p>
                                <Link to="/login"><p>{t("login")} </p></Link>
                                <Link to="/register"><p id="Sign">{t("signup")}</p></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar

