import React from "react";
import "./groupCardMobile.css";
import usePocketContext from "../../../Hooks/usePocketContext";
import { useNavigate } from "react-router-dom";

function GroupCardMobile({ title }) {
  const { selected, setSelected } = usePocketContext();
  const navigate = useNavigate(); // Use the useNavigate hook

  const nameInitials = title.name
    .split(" ")
    .length > 1
    ? title.name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
    : title.name.length > 1
    ? (title.name[0] + title.name[title.name.length - 1]).toUpperCase()
    : title.name.toUpperCase();
  const newTitle = title.name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleTitleClick = () => {
    setSelected(title.name);
    navigate("/notes"); // Use navigate as a function to redirect
  };

  return (
    <div
      onClick={handleTitleClick}
      className={`mobile-groupName ${
        selected === title.name ? "mobile-selected-groupName" : ""
      }`}
    >
      <div className="mobile-groupName-logo" style={{ backgroundColor: title.color }}>
        {nameInitials}
      </div>
      <div className="mobile__title">{newTitle}</div>
    </div>
  );
}

export default GroupCardMobile;
