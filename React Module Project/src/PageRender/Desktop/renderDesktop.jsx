import React from "react";
import "./renderDesktop.css";
import usePocketContext from "../../Hooks/usePocketContext";
import Sidebar from "../../Components/Desktop/Sidebar/sideBar";
import NotesGroup from "../../Components/Desktop/NotesGroup/notesGroup";
import LandingHomePage from "../../Components/Desktop/LandingHomePage/landingHomePage";

function RenderDesktop() {
  const { selected } = usePocketContext();

  return (
    <div className="desktop">
      <Sidebar />
      {selected.length > 0 ? <NotesGroup /> : <LandingHomePage />}
    </div>
  );
}

export default RenderDesktop;
