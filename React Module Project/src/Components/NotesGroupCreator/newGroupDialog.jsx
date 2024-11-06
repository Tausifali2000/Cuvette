import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import './newGroupDialog.css';

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

 

 

  
  return (
    <>
      
      <dialog  ref={dialogRef} onClick={(e) => {
        if(e.currentTarget === e.target) {
          toggleDialog();
        }
      }}>
        <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
          <h1>Create New Group</h1>
          <div className="dialog-groupName">
            <h2>Group Name</h2>
            <input type="text" className="dialog-groupNameInput" />
           </div>
           <div className="dialog-chooseColour">
            <h3>Choose Colour</h3>
            <div className="dialog-colorButtons">
            <button className="color-1"></button>
            <button className="color-2"></button>
            <button className="color-3"></button>
            <button className="color-4"></button>
            <button className="color-5"></button>
            <button className="color-6"></button>
            </div>
          </div>
          <div className="dialog-create-container">
          <button className="dialog-create">
            Create
          </button>
          </div>
          
       </div>
      </dialog>
    </>
  );
});

export default NewGroupDialog