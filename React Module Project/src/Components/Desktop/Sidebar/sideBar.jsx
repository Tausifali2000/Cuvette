import React, { useEffect, useState } from "react";
import "./sideBar.css";
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
    setTitles(groupNamesParent);
  }, [groupNamesParent]);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  return (
    <div className="desktop-sidebar">
      <div className="desktop-sidebar-title">
        <h1>Pocket Notes</h1>
      </div>

      <div className="desktop-sidebar-noteGroup">
        {titles.map((title, index) => (
          <GroupCard key={index} title={title} />
        ))}
      </div>

      <button id="desktop-dialog-open" onClick={handleOpenPopup}>+</button>

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
