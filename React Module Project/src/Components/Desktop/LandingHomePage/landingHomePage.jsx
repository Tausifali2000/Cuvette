import React from 'react';
import "./landingHomePage.css";
import { assets } from '../../../assets/assets';


function LandingHomePage() {
  return (
    <div className='desktop-landingPage'>
      <img src={assets.homePage_image} alt="home" />
      
      <h1>Pocket Notes</h1>
      <p>Send and receive messages without keeping your phone online.
        <br/>Use Pocket Notes on up to 4 linked Devices and 1 mobile phone.</p>
      <div className="desktop-encryption">
          <img src={assets.encryption_logo} alt="lock" /> 
        <p>end-to-end encrypted </p>
      </div>
    </div>
  )
}

export default LandingHomePage;