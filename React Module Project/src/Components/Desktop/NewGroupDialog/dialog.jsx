import React, { useState, forwardRef } from "react";
import "./dialog.css";

const Dialog = forwardRef(({ groupNamesParent, setGroupNamesParent, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [error, setError] = useState(""); 

  const colors = [
    "rgb(179, 139, 250)",
    "rgb(255, 121, 242)",
    "rgb(67, 230, 252)",
    "rgb(241, 149, 118)",
    "rgb(0, 71, 255)",
    "rgb(102, 145, 255)"
  ];

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
    setError(""); 
  };

  const handleColor = (color) => {
    setBgColor(color);
  };

  const saveName = (e) => {
    e.preventDefault();
    const trimmedGroupName = groupName.trim();
    const groupExists = groupNamesParent.some(
      (group) => group.name.toLowerCase() === trimmedGroupName.toLowerCase()
    );
  
    if (groupExists) {
      setError("Group name already exists!");
      return; 
    }
  
    const newGroup = { name: trimmedGroupName, color: bgColor };
    
   
    setGroupNamesParent([...groupNamesParent, newGroup]);
    localStorage.setItem(
      "groupNames",
      JSON.stringify([...groupNamesParent, newGroup])
    );
    
    onClose(); 
  };

  return (
    <dialog className="desktop-dialog" open>
      <form onSubmit={saveName}>
        <div className="desktop-dialog-title"><h1>Create New Group</h1></div>
        
        <div className="desktop-dialog-groupName">
          <h2>Group Name</h2>
          <input
            value={groupName}
            onChange={handleGroupName}
            type="text"
            placeholder="Enter group name"
          />
          
          
        </div>
        <div className="desktop-error">
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="desktop-dialog-chooseColor">
          <h3>Choose Colour</h3>
          <div className="desktop-dialog-colorSelector">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`desktop-dialog-colors${index + 1} ${
                  bgColor === color ? "highlight" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColor(color)}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="desktop-dialog-create">
          <button type="submit" disabled={groupName.length === 0}>
            Create
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default Dialog;
