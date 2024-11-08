import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState, useContext } from 'react';

import './newGroupDialog.css';
import NoteContext from '../Context/NoteContex';

const NewGroupDialog = forwardRef((props, ref) => {
  
 
  const dialogRef = useRef(null);
  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  

 useImperativeHandle(ref, () => ({
    toggleDialog,
  }));

  const dataContext = useContext(NoteContext);

  const colors = [
    "rgb(204, 204, 204)",
    "rgb(255, 121, 242)",
    "rgb(67, 230, 252)",
    "rgb(241, 149, 118)",
    "rgb(0, 71, 255)",
    "rgb(102, 145, 255)"
  ];

  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  
  const handleClick = (e, selectedColor) => {
   
    setSelectedColor(selectedColor);
  };

  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const createGroup = (e) => {
    e.preventDeafult();

    const allGroups = JSON.parse(localStorage.getItem("notesData")) || [];
  

  const newGroup = {
    groupName: groupName,
    color: selectedColor,
    isSelected: false,
    notes: []
  };

  dataContext.setNotesData([...dataContext.notesData, newGroup]);
  
  localStorage.setItem("notesData",
    JSON.stringify([...dataContext.notesData, newGroup])
  );
  setGroupName("");
  setColor("");
};

 

 

  
  return (
    <>
      
      <dialog  ref={dialogRef} 
      onClick={(e) => {
        if(e.currentTarget === e.target) {
          toggleDialog();
        }
      }}>
        <form className="dialog-container" onSubmit={createGroup} onClick={(e) => e.stopPropagation()}>
          <h1>Create New Group</h1>
          <div className="dialog-groupName">
            <h2>Group Name</h2>
            <input 
            type="text" 
            className="dialog-groupNameInput"
            id="groupName"
            placeholder='Enter your group name...'
            value = {groupName}
            onChange={handleGroupName}
            required
            />
           </div>
           <div className="dialog-chooseColour">
            <h3>Choose Colour</h3>
            <div className="dialog-colorButtons">
            {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  className={`color-button ${selectedColor === color ? "selected" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleClick(color)}
                />
              ))}
            </div>
          </div>
          <div className="dialog-create-container">
          <button type="sumbit" className="dialog-create" >
            Create
          </button>
          </div>
          
       </form>
      </dialog>
    </>
  );
});

export default NewGroupDialog