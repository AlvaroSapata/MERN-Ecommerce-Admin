import { BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';

import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Admin from "./Pages/Admin";
// import Register from "./Components/Auth/RegisterPage.jsx"

function App() {
  const [isInHome, setIsInHome] = useState(false);
  const [isInLogin, setIsInLogin] = useState(false);
  const [doesContentFit, setDoesContentFit] = useState(false);
  

  return (
    <BrowserRouter>
      <div className={isInHome|| isInLogin || doesContentFit ? 'home' : ''}>
        <Navbar />
        <Admin setIsInHomeProp={setIsInHome} setDoesContentFitProp={setDoesContentFit} setIsInLoginProp={setIsInLogin}/> 
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
