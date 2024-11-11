import React, { useEffect, useState } from "react";
import "./sidebarMobile.css";
import GroupCardMobile from "../GroupCardMobile/groupCardMobile";
import DialogMobile from "../NewGroupDialogMobile/dialogMobile";


function SidebarMobile() {
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
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-title">
        <h1>Pocket Notes</h1>
      </div>
      
      <div className="mobile-sidebar-noteGroup">
        {titles.length > 0 ? (
          titles.map((title, index) => <GroupCardMobile key={index} title={title} />)
        ) : ""}
      </div>
      
      
      
     
      {isPopupOpen && (
        <>
          <div className="mobile-backdrop" onClick={handleClosePopup}></div>
          <DialogMobile
            groupNamesParent={groupNamesParent}
            setGroupNamesParent={setGroupNamesParent}
            onClose={handleClosePopup}
          />
        </>
      )}

     
      <button id="mobile-dialog-open"onClick={handleOpenPopup}>+</button>
    
     
    </div>
  );
}

export default SidebarMobile;
