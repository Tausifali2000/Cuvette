import React, { useRef, forwardRef, useImperativeHandle } from 'react';
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
      
      <dialog className='newGroup-dialog' ref={dialogRef}>
        <div className="main-container">
          <div className="groupName">
            <h1>Group Name</h1>
            <input type="text" className="groupName" />
          </div>
          <div className="chooseColour">
            <h1>Choose Colour</h1>
            <button className="color-1"></button>
            <button className="color-2"></button>
            <button className="color-3"></button>
            <button className="color-4"></button>
            <button className="color-5"></button>
            <button className="color-6"></button>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default NewGroupDialog