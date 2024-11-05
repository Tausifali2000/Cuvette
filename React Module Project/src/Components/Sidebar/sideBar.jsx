import React from 'react';
import "./sideBar.css";

const SideBar = () => {
  return (
    <>
     <div className="sideBar">
        <div className="sideBar-title">
            <h1>Pocket Notes</h1>
        </div>
        
        <button className="addNewGroup-button">
          +
        </button>
     </div>
    </>
   
  )
}

export default SideBar