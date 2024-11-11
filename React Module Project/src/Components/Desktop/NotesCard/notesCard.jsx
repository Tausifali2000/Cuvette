import React from "react";
import "./notesCard.css";
import { assets } from "../../../assets/assests";

function NotesCard ({ note }) {
  
  return (
    <div className="desktop-notesContent-container">
    <div className="desktop-notesContent">
      <p>{note.content}</p>
    </div>
    <div className="desktop-notesStamp-container">
      <div className="desktop-notesDate">{note.date}</div>
      <div className="ellipse"><img src={assets.ellipse}/> </div>
      <div className="desktop-notesTime">{note.time}</div>
    </div>
    
  </div>
  );
}

export default NotesCard;
