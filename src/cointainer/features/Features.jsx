import React from 'react';
import Feature from '../../component/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'content',
    text: 'content'
  },
  {
    title: 'content',
    text: 'content'
  },

  {
    title: 'content',
    text: 'content'
  },

  {
    title: 'content',
    text: 'content'
  },

];

const Features = () => (
  <div className="RSI__features section__padding" id="features">
    <div className="RSI__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
      {/* <p>Request Early Access to Get Started</p> */}
    </div>
    <div className="RSI__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
