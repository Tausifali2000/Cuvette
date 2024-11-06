import React, { useRef } from 'react';
import "./sideBar.css";
import GroupName from './groupName';
import "./groupName.css";
import NewGroupDialog from '../NotesGroupCreator/newGroupDialog';


const SideBar = () => {

  const dialogRef = useRef(null);
  const handleAddNewGroupClick = () => {
    if (dialogRef.current) {
      dialogRef.current.toggleDialog();
    }
  };
  return (
    <>
     <div className="sideBar">
        <div className="sideBar-title">
            <h1>Pocket Notes</h1>
        </div>
        
        <button onClick={handleAddNewGroupClick}  className="addNewGroup-button">
          +
        </button>
        <GroupName />
       </div>
       <NewGroupDialog ref={dialogRef} />
    </>
   
  )
}

export default SideBar