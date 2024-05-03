import {Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Registration from "./components/Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/registration" element={<Registration/>}/>
    </Routes>
    </div>
  );
}

export default App;
