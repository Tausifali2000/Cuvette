import React from "react";
import "./notesGroupCard.css";
import usePocketContext from "../../../Hooks/usePocketContext.jsx";

function NotesGroupCard({ title }) {
  const { selected, setSelected } = usePocketContext();

  const nameInitials = title.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const newTitle = title.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleTitleClick = () => {
    setSelected(title.name);
  };

  return (
    <div
      onClick={handleTitleClick}
      className={`desktop-groupName ${
        selected === title.name ? "desktop-selected-groupName" : ""
      }`}
    >
      <div className="desktop-groupName-logo" style={{ backgroundColor: title.color }}>
        {nameInitials}
      </div>
      <div className="group__title">{newTitle}</div>
    </div>
  );
}

export default NotesGroupCard;
