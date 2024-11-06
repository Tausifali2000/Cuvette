import React from 'react';
import './notesGroupContent.css';
import {assets} from '../../assets/assests.js'
import GroupName from '../Sidebar/groupName.jsx';

const NotesGroupContent = () => {
  return (
    <>
    <div className="notesContent-container">
    <div className="content-header">
        <GroupName />
    </div>
    
    <div className="content-container">
      <div className="content-notes"> <p>Another productive way to use this tool to begin a daily writing routine. 
        One way is to generate a random paragraph with the intention to try to rewrite it while still keeping the original meaning. The purpose here is to just get the writing started so that when the writer goes 
        onto their day's writing projects, words are already flowing from their fingers.</p>
      </div>
    </div>
    <div className="input-container">
      <textarea placeholder='Enter your text here.....'>
      </textarea>
      <button className="createNote">
        <img src={assets.create_disabled} />
      </button>
    </div>
    </div>
    
    </>
  )
}

export default NotesGroupContent