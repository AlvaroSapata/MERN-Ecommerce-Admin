import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./CSS/Admin.css";

import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import BackgroundImage from "../Components/Assets/backgroundImage";
import EditProduct from "../Components/EditProduct/EditProduct";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";

const Admin = ({ setIsInHomeProp, setDoesContentFitProp, setIsInLoginProp }) => {
  const location = useLocation();
  const [isInHome, setIsInHome] = useState(false);

  useEffect(() => {
    const isInHomeValue = location.pathname === "/";
    setIsInHomeProp(isInHomeValue);
    setIsInHome(isInHomeValue);

    const isInLogin = location.pathname === "/login" || location.pathname === "/register";
    setIsInLoginProp(isInLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setIsInHomeProp, setIsInLoginProp]);

  return (
    <div className="admin">
      <Sidebar />
      {isInHome && <BackgroundImage />}
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Admin;
