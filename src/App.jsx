import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./pages/1.sign-in/Signin";
import Dashboard from "./pages/2.dashboard/Dashboard";

function App() {
  return (
    <div>
      <Router>
        
        <Routes>

        <Route exact path='/' element={<Signin />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
