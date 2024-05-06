import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Ingredients from "./Components/Ingredients";
import Plats from "./Components/Plats"
import Calcul from "./Components/Calcul"
import WelcomePage from "./Components/WelcomePage"
function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
      <Route path="/" element={ <WelcomePage/> } />
      <Route path="/Ingredients" element={ <Ingredients /> } />
      <Route path="/Plats" element={ <Plats /> } />
      <Route path="/Calcul" element={ <Calcul />} />
      </Routes>
    </div>
  );
}

export default App;
