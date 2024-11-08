import React, { useContext, useEffect, useRef } from 'react';
import "./sideBar.css";
import GroupName from './groupName';
import "./groupName.css";
import NewGroupDialog from '../NotesGroupCreator/newGroupDialog';
import NoteContext from '../Context/NoteContex';


const SideBar = () => {

  const dialogRef = useRef(null);
  const handleAddNewGroupClick = () => {
    if (dialogRef.current) {
      dialogRef.current.toggleDialog();
    }
  };
  
  const dataContext = useContext(NoteContext);
  
  const dataLocal = localStorage.getItem("notesData");
  useEffect(() => {
    if (dataLocal) {
      dataContext.setNotesData(JSON.parse(dataLocal));
    } else {
      dataContext.setNotesData([]);
    }
  }, [dataLocal]);

  const data = dataContext.notesData
    ? Object.entries(dataContext.notesData)
    : [];

    useEffect(() => {
      localStorage.setItem("selected", JSON.stringify(""));
  
      const storedData = JSON.parse(localStorage.getItem("notesData"));
      if (storedData && storedData.length > 0) {
        let foundIndex = storedData.findIndex((item) => item.isSelected === true);
        if (foundIndex !== -1) {
          storedData[foundIndex].isSelected = false;
        }
        localStorage.setItem("notesData", JSON.stringify(storedData));
      }
    }, []);


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