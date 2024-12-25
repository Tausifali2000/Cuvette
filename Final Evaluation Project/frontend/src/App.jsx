import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingpages/landingpage";
import Signup from "./pages/landingpages/Signup";
import Login from "./pages/landingpages/Login";
import { Toaster } from "react-hot-toast";
import HomeScreen from "./pages/userpages/HomeScreen";
import CreateForm from "./pages/userpages/CreateForm";

function App() {
  

  return (
    <>
    
     <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path ='/home' element={<HomeScreen />} />
        <Route path ='/createform' element={<CreateForm />}/>
     </Routes>
     <Toaster />
    </>
  )
}

export default App
