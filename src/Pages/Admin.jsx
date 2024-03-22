import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./CSS/Admin.css";

import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import BackgroundImage from "../Components/Assets/backgroundImage";

const Admin = ({ setIsInHomeProp, setDoesContentFitProp }) => {
  const location = useLocation();
  const [isInHome, setIsInHome] = useState(false);
  const [doesContentFit, setDoesContentFit] = useState(false);

  useEffect(() => {
    const isInHomeValue = location.pathname === "/";
    const doesContentFitValue = !(
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight
    );
    setIsInHomeProp(isInHomeValue);
    setIsInHome(isInHomeValue);
    setDoesContentFitProp(doesContentFitValue);
    setDoesContentFit(doesContentFitValue);
  }, [location.pathname, setIsInHomeProp, setDoesContentFitProp]);

  return (
    <div className="admin">
      <Sidebar />
      {isInHome && <BackgroundImage />}
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
