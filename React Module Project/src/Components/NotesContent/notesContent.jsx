import React from "react";
import "./notesGroupContent.css";

function NotesContent({ note }) {
  
  return (
    <div className="desktop-notesContent-container">
      <div className="desktop-notesContent">
        <p>{note.content}</p>
      </div>
      <div className="desktop-notesStamp-container">
        <div className="desktop-notesDate">{note.date}</div>
        <div className="vector"> </div>
        <div className="desktop-notesTime">{note.time}</div>
      </div>
      
    </div>
  );
}

export default NotesContent;
