import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import React, {useState} from 'react';


function App() {
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home showError={updateErrorMessage}/>}/>
        
        <Route path="/registration" element={<Registration showError={updateErrorMessage}/>}/>
    
    </Routes>
    </div>
  );
}

export default App;
