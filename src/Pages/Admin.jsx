// En el componente Admin
import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./CSS/Admin.css";
import { BounceLoader } from "react-spinners";

import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import ListProduct from "../Components/ListProduct/ListProduct";
import BackgroundImage from "../Components/Assets/backgroundImage";
import EditProduct from "../Components/EditProduct/EditProduct";

const Admin = ({ setIsInHomeProp, setDoesContentFitProp }) => {
  const location = useLocation();
  const [isInHome, setIsInHome] = useState(false);
  const [doesContentFit, setDoesContentFit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isInHomeValue = location.pathname === "/";
    setIsInHomeProp(isInHomeValue);
    setIsInHome(isInHomeValue);
  }, [location.pathname, setIsInHomeProp]);

  useEffect(() => {
    if (!isLoading) {
      const doesContentFitValue = !(
        document.documentElement.scrollHeight >
        document.documentElement.clientHeight
      );
      setDoesContentFitProp(doesContentFitValue);
      setDoesContentFit(doesContentFitValue);
    }
  }, [isLoading, setDoesContentFitProp]);

  return (
    <div className="admin">
      <Sidebar />
      {isLoading && (
        <div className="spinner">
          <BounceLoader color="#db1a5a" />
        </div>
      )}
      {isInHome && <BackgroundImage />}
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route
          path="/listproduct"
          element={<ListProduct setIsLoading={setIsLoading} />} // Pasar setIsLoading a ListProduct
        />
        <Route path="/editproduct/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
