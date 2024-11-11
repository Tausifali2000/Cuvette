import React, { useEffect, useState } from "react";
import "./sidebar.css";



import GroupCard from "../GroupCard/groupCard";
import Dialog from "../NewGroupDialog/dialog";




function Sidebar() {
  const [titles, setTitles] = useState([]);
  const [groupNamesParent, setGroupNamesParent] = useState(
    JSON.parse(localStorage.getItem("groupNames")) || []
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("groupNames");
    if (data) {
      setGroupNamesParent(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (groupNamesParent.length > 0) {
      setTitles(groupNamesParent);
    }
  }, [groupNamesParent]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="desktop-sidebar">
      <div className="desktop-sidebar-title">
        <h1>Pocket Notes</h1>
      </div>
      
      <div className="desktop-sidebar-noteGroup">
        {titles.length > 0 ? (
          titles.map((title, index) => <GroupCard key={index} title={title} />)
        ) : ""}
      </div>
      
      <button id="desktop-dialog-open"onClick={handleOpenPopup}>+</button>
      
      {/* Conditionally render the popup and custom backdrop */}
      {isPopupOpen && (
        <>
          <div className="backdrop" onClick={handleClosePopup}></div>
          <Dialog
            groupNamesParent={groupNamesParent}
            setGroupNamesParent={setGroupNamesParent}
            onClose={handleClosePopup}
          />
        </>
      )}
    </div>
  );
}

export default Sidebar;
