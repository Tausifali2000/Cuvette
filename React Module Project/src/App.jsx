import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "./Context/PocketContext";
import usePocketContext from "./Hooks/usePocketContext";
import RenderDesktop from "./PageRender/Desktop/renderDesktop";
import RenderMobile from "./PageRender/Mobile/renderMobile";
import NotesGroupMobile from "./Components/Mobile/NotesGroupMobile/notesGroupMobile";

function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { selected, setSelected } = usePocketContext();

  useEffect(() => {
   setSelected(localStorage.getItem("selected") || "");
  }, [setSelected]);

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize(window.innerWidth);
    };

   window.addEventListener("resize", checkScreenSize);
  return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Provider>
      <div className="App">
        <Router>
          {screenSize > 500 ? (
            <RenderDesktop />
          ) : (
            <Routes>
              <Route path="/" element={<RenderMobile />} />
              <Route path="/notes" element={<NotesGroupMobile />} />
            </Routes>
          )}
        </Router>
      </div>
    </Provider>
  );
}

export default App;
