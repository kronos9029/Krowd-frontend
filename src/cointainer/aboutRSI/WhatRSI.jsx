import React from 'react';
import Feature from '../../component/feature/Feature';
import './whatRSI.css';

const WhatRSI = () => (
  <div className="RSI__whatRSI section__margin" id="wRSI">
    <div className="RSI__whatRSI-feature">
      <Feature title="What is RSI" text="Build your community,
  diversify your portfolio
Build the future world you want to see by investing directly
in businesses that are the backbone of local communities." />
    </div>
    <div className="RSI__whatRSI-heading">
      <h1 className="gradient__text">Get in early.<br/>
Startups are changing the world around us. Now you can get involved too.</h1>
      <p>Get Started</p>

    </div>
    <div className="RSI__whatRSI-container">
      <Feature title="Regular cash payments*" text="Debt investments can offer regular cash payments" />
      <Feature title="Expand your portfolio" text="Diversify your portfolio with Main Street businesses" />
      <Feature title="Invest in your own backyard" text="Invest in local community-building businesses" />
    </div>
  </div>
);

export default WhatRSI;
