import React from 'react';
// import people from '../../assets/people.png';
// import is from '../../assets/IS.jpg';
import is from '../../assets/ISS.jpg';
import './header.css';

const Header = () => (
  <div className="RSI__header section__padding" id="home">
    <div className="RSI__header-content">
      <h1 className="gradient__text">Let&apos;s Invest in local
businesses</h1>
      <p>Invest in growing Main Street
businesses all over the U.S.</p>
      <div className="RSI__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>
    </div>

    <div className="RSI__header-image">
      <img  src={is} />
    </div>
  </div>
);

export default Header;
