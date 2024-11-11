import React, { useEffect, useState } from "react";
import "./notesGroupMobile.css";
import usePocketContext from "../../../Hooks/usePocketContext";
import { assets } from "../../../assets/assets";
import NotesCardMobile from "../NotesCardMobile/notesCardMobile.jsx";
import { useNavigate } from "react-router-dom";

function NotesGroupMobile() {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [initials, setInitials] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const { notes, setNotes, selected } = usePocketContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem(selected)) || []);
    const groupNames = JSON.parse(localStorage.getItem("groupNames"));
    const selectedGroup = groupNames.find((group) => group.name === selected);
    
    if (selectedGroup) {
      setBgColor(selectedGroup.color);

      const nameParts = selectedGroup.name.split(" ");
      const groupInitials = nameParts.length > 1
        ? nameParts[0].charAt(0) + nameParts[1].charAt(0)
        : nameParts[0].charAt(0) + nameParts[0].charAt(nameParts[0].length - 1);
      
      setInitials(groupInitials.toUpperCase());

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

  const goBack = () => {
    
    navigate("/");
  };

 

  return (
    <div className="mobileNotes-container">
      <div className="mobileNotes-title-container">
        <div className="back-container">
          <img onClick={goBack} src={assets.back} alt="" />
        </div>
        <div
          className="mobileNotes-title-logo"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="mobileNotes-title"><h1>{selectedTitle}</h1></div>
      </div>
      <div className="mobileNotes-content">
        {notes && notes.length > 0
          ? notes.map((note, index) => (
              <NotesCardMobile key={index} note={note} />
            ))
          : null}
      </div>
      <div className="mobile-textInput-container">
        <div className="mobile-textArea">
        <textarea
          value={text}
          placeholder="Enter your text here.........."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        </div>
        
       
        <img
          src={text.trim() ? assets.create_enbaled : assets.create_disabled} 
          alt="enter"
          onClick={handleSaveNotes}
          style={{ cursor: text.trim() ? 'pointer' : 'not-allowed' }} 
        />
      </div>
    </div>
  );
}

export default NotesGroupMobile;
