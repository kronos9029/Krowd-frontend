import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import people from '../../assets/people.png';
// import is from '../../assets/IS.jpg';
import is from '../../assets/ISS.jpg';
import './header.css';
const Header = () => (
  <div className="RSI__header section__padding" id="home">
    <div className="RSI__header-content pl-5">
      <Row className="pl-5">
      <h1 >Let&apos;s Invest in local
businesses</h1>
      </Row>

      <p>Invest in growing Main Street
businesses all over the U.S.</p>
      <div className="RSI__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <Link to='/register'><button type="button">Get Started</button></Link>
      </div>
    </div>

    <div className="RSI__header-image">
      <img  src={is} />
    </div>
  </div>
);

export default Header;
