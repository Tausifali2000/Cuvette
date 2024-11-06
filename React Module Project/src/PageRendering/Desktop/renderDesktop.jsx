import React from 'react'
import SideBar from '../../Components/Sidebar/sideBar'
import LandingHomePage from '../../Components/LandingHomePage/landingHomePage'
import './renderDesktop.css'


const RenderDesktop = () => {
  return (
   <>
    <div className="main-container">
      <SideBar />
      <LandingHomePage />
    </div>
   </>
  
  )
}

export default RenderDesktop