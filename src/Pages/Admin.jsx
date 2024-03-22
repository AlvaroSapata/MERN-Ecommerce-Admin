import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./CSS/Admin.css";

import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import BackgroundImage from "../Components/Assets/backgroundImage";

const Admin = ({ setIsInHomeProp }) => {
  const location = useLocation();
  const [isInHome, setIsInHome] = useState(false);

  useEffect(() => {
    const isInHomeValue = location.pathname === "/";
    setIsInHomeProp(isInHomeValue);
    setIsInHome(isInHomeValue); // Cambia isInHome a true solo si estamos en la página de inicio
  }, [location.pathname, setIsInHomeProp]);

  return (
    <div className="admin">
      <Sidebar />
      {isInHome && <BackgroundImage />} {/* Renderiza BackgroundImage solo cuando isInHome es verdadero */}
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
