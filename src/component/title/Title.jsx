import { React } from 'react';
import './title.css';

import Aos from 'aos';
import "aos/dist/aos.css"
Aos.init({ duration: 2000 });
localStorage.setItem("name","Title.text");

const Title = ({ imgUrl,logo, date, text ,des} ) => (
 
  
  <div className="RSI_invertco-container_title" >
    <div className="RSI_invertco-container_title-image" data-aos="zoom-in">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="RSI_invertco-container_title-content" >
      <div className='RSI__card'>
      <img className='RSI_logo_invertco' src={logo} alt="" />
        {/* <p>{date}</p> */}
        <h3 >{text}</h3>
        <p>{des}</p>
      <div className='RSI__card-content'>
        <p>$213238123798 raise</p>
        <hr/>
        <p>1,954 visitor</p>
        <hr/>
        <p>1,954 visitor</p>
      </div>
      </div>
    </div>



      {/* <div className='RSI__card'>
            <div className='RSI__card-content'>
              <h2 className='RSI_card-title'> Invert</h2>
              <p className='RSI_card-body'>
                SOmthing
              </p>
              <a href='#' className='RSI_button_more'>See more</a>
            </div>
          </div> */}
  </div>
);

export default Title;
