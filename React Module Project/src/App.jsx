import { useEffect, useState } from "react";




import { Provider } from "./Context/PocketContext";
import usePocketContext from "./Hooks/usePocketContext.jsx";
import RenderDesktop from "./PageRender/Desktop/renderDesktop";


function App() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { selected, setSelected } = usePocketContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
    // eslint-disable-next-line
  }, [selected]);
  const checkScreenSize = () => {
    setScreenSize(window.innerWidth);
  };

  window.addEventListener("resize", checkScreenSize);
  return (
    <Provider>
      <div className="App">
        {screenSize > 500 ? (
          <RenderDesktop />
        ) : <RenderDesktop /> }
        
        {/* // (
        //   <Router>
        //     <Routes>
        //       <Route path="/" element={<MobileView />} />
        //       <Route path="/notes" element={<NotesMobilePage />} />
        //     </Routes>
        //   </Router>
        // ) */}
        
        
      </div>
    </Provider>
  );
}

export default App;