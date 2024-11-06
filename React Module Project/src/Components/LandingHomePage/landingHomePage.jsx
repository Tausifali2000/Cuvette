import React from 'react'
import './landingHomePage.css'
import {assets} from '../../assets/assests.js'
const LandingHomePage = () => {
  return (
    <div className="notes-container">
      <div className="description">
        <img className="homePage_image" src={assets.homePage_image} />
        <h1>Pocket Notes</h1>
        <p>
          
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className="encryption-message">
        <img src = {assets.encryption_logo}/>
        <p>end-to-end encrypted</p>
      </div>
    </div>
  )
}

export default LandingHomePage