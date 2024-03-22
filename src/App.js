import { BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';

import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Admin from "./Pages/Admin";

function App() {
  const [isInHome, setIsInHome] = useState(false);
  const [doesContentFit, setDoesContentFit] = useState(false);

  return (
    <BrowserRouter>
      <div className={isInHome|| doesContentFit ? 'home' : ''}>
        <Navbar />
        <Admin setIsInHomeProp={setIsInHome} setDoesContentFitProp={setDoesContentFit}/> 
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
