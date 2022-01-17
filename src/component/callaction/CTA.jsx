import React from 'react';
import { Link } from 'react-router-dom';
import './cta.css';

const CTA = () => (
  <div className="RSI__cta">
    <div className="RSI__cta-content">
      <h3> Don’t miss out. Get new startups in your inbox</h3>
       <div  className="RSI__header-content__input-CTA">
        <Link to='/create/fundraiser/details'><button type="button">Start a Revenue Share Invest</button></Link>
      </div>
    </div>


  </div>
);

export default CTA;
