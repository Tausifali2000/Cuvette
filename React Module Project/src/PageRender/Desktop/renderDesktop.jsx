import React from 'react'
import SideBar from '../../Components/Desktop/Sidebar/sideBar'
import LandingHomePage from '../../Components/Desktop/LandingHomePage/landingHomePage'
import './renderDesktop.css'
import GroupName from '../../Components/Desktop/Sidebar/groupName'
import NotesGroupContent from '../../Components/NotesGroupContent/notesGroupContent'
import NoteContext from '../../Components/Context/NoteContex'


const RenderDesktop = () => {
  const noteData = useContext(NoteContext)
  
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