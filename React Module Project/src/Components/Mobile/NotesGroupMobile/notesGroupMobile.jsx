import React, { useEffect, useState } from "react";
import "./notesGroupMobile.css";


import usePocketContext from "../../../Hooks/usePocketContext";
import { assets } from "../../../assets/assets";

import NotesCardMobile from "../NotesCardMobile/NotesCardMobile";

function NotesGroupMobile() {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [initials, setInitials] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const { notes, setNotes, selected } = usePocketContext();

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem(selected)) || []);
    const groupNames = JSON.parse(localStorage.getItem("groupNames"));
    const selectedGroup = groupNames.find((group) => group.name === selected);
    if (selectedGroup) {
      setBgColor(selectedGroup.color);
      setInitials(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .toUpperCase()
      );
      setSelectedTitle(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [selected, setNotes]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNotes();
    }
  };

  const handleSaveNotes = () => {
    if (!text.trim()) {
      return;
    }
    const notes = JSON.parse(localStorage.getItem(selected)) || [];
    const newNoteObj = {
      id: Date.now(),
      title: selected,
      content: text.trim(),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit", minute: "2-digit"
      }),
    };
    notes.push(newNoteObj);
    localStorage.setItem(selected, JSON.stringify(notes));
    setText("");
    setNotes(notes);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="desktop__notes">
      <div className="desktop__notes__title">
        <div
          className="desktop__notes__title__color"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="desktop__notes__title__text">{selectedTitle}</div>
      </div>
      <div className="desktop__notes__content">
        {notes && notes.length > 0
          ? notes.map((note, index) => (
              <NotesCardMobile key={index} note={note} />
            ))
          : null}
      </div>
      <div className="desktop-textInput-container">
        <div className="textArea">
        <textarea
          value={text}
          placeholder="Enter your notes here"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        </div>
       
         <img src={assets.create_enbaled} alt="enter" onClick={handleSaveNotes} /> 
      </div>
    </div>
  );
}

export default NotesGroupMobile;
