import React, { useState, forwardRef } from "react";
import "./dialogMobile.css";

const DialogMobile = forwardRef(({ groupNamesParent, setGroupNamesParent, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [bgColor, setBgColor] = useState("");

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
  };

  const handleColor = (color) => {
    setBgColor(color);
  };

  const saveName = (e) => {
    e.preventDefault();
    const newGroup = { name: groupName, color: bgColor };
    setGroupNamesParent([...groupNamesParent, newGroup]);
    localStorage.setItem(
      "groupNames",
      JSON.stringify([...groupNamesParent, newGroup])
    );
    onClose(); 
  };

  return (
    <dialog className="mobile-dialog" open>
      <form onSubmit={saveName}>
        <div className= "mobile-dialog-title"><h1>Create New Group</h1></div>
        
        <div className="mobile-dialog-groupName">
          <h2>Group Name</h2>
          <input
            value={groupName}
            onChange={handleGroupName}
            type="text"
            placeholder="Enter group name"
          />
        </div>
        
        <div className="mobile-dialog-chooseColor">
          <h3>Choose Colour</h3>
          <div className="mobile-dialog-colorSelector">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`mobile-dialog-colors${index + 1} ${
                  bgColor === color ? "highlight" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColor(color)}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="mobile-dialog-create">
          <button type="submit" disabled={groupName.length === 0}>
            Create
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default DialogMobile;