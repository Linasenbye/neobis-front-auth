import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import React, {useState} from 'react';
import Login from "./pages/Login"
import Confirm from "./pages/Confirm";
import { useSelector } from "react-redux"; 
import RequireAuth from "./hooks/use-auth"; 

function App() {
  const auth = useSelector(state => state.auth );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="home"
          element={auth.currentUser ? <RequireAuth><Home /></RequireAuth> : <Navigate to="/" />}
        />
  
        <Route path="/confirm" element={<Confirm />}/>
        
        <Route path="/registration" element={<Registration/>}/>
    
    </Routes>
    </div>
  );
}

export default App;
