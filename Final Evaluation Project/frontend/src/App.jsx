import { Navigate, Route, Routes } from "react-router-dom";

import Signup from "./pages/landingpages/Signup";
import Login from "./pages/landingpages/Login";
import { Toaster } from "react-hot-toast";
import HomeScreen from "./pages/userpages/HomeScreen";

import Home from "./pages/Home";
import { useAuthStore } from "../store/authUser";
import { useEffect } from "react";
import BuildForm from "./pages/userpages/BuildForm";
import FormViewer from "./formview/FormViewer";
import Settings from "./pages/userpages/Settings";


function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("Auth user is here:", user);

  useEffect(() => {
    authCheck();
  }, []);

 

  return (
    <>
    
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login/> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!user ? <Signup/> : <Navigate to={'/'} />} />
        <Route path ='/home' element={<HomeScreen />} />
        <Route path ='/home/settings' element={<Settings />} />
        <Route path ='/buildform/:formId' element={<BuildForm />}/>
        <Route path ='/response/:formId' element={<Response />}/>
        <Route path = '/formview/:formId' element={<FormViewer />} />
     </Routes>
     <Toaster />
    </>
  )
}

export default App
