import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpages/landingpage";
import Signup from "./pages/landingpages/Signup";
import Login from "./pages/landingpages/Login";
import { Toaster } from "react-hot-toast";

function App() {
  

  return (
    <>
    
     <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
     </Routes>
     <Toaster />
    </>
  )
}

export default App
