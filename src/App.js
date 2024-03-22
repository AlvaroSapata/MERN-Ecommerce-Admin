import { BrowserRouter } from "react-router-dom";
import React, { useState } from 'react';

import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Admin from "./Pages/Admin";

function App() {
  const [isInHome, setIsInHome] = useState(false);
  console.log(isInHome)

  return (
    <BrowserRouter>
      <div className={isInHome ? 'home' : ''}>
        <Navbar />
        <Admin setIsInHomeProp={setIsInHome}/> 
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
