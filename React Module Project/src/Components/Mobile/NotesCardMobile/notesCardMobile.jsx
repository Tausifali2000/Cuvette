import React from "react";
import "./notesCardMobile.css";
import { assets } from "../../../assets/assets";


function NotesCardMobile ({ note }) {
  
  return (
    <div className="mobile-notesContent-container">
    <div className="mobile-notesContent">
      <p>{note.content}</p>
    </div>
    <div className="mobile-notesStamp-container">
      <div className="mobile-notesDate">{note.date}</div>
      <div className="ellipse"><img src={assets.ellipse}/> </div>
      <div className="mobile-notesTime">{note.time}</div>
    </div>
    
  </div>
  );
}

export default NotesCardMobile;
