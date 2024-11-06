import React from 'react'
import SideBar from '../../Components/Sidebar/sideBar'
import LandingHomePage from '../../Components/LandingHomePage/landingHomePage'
import './renderDesktop.css'
import GroupName from '../../Components/Sidebar/groupName'
import NotesGroupContent from '../../Components/NotesGroupContent/notesGroupContent'


const RenderDesktop = () => {
  return (
   <>
    <div className="main-container">
      <SideBar />
       {/* <LandingHomePage /> */}
       <NotesGroupContent />
    </div>
   </>
  
  )
}

export default RenderDesktop