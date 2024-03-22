import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  return (
    <div className="listproduct">
      <h3>Products List</h3>
      <div className="listproduct-format-main">
        <p></p>
        <p>Name</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p></p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => {
          return (
            <div key={e.name} className="listproduct-fixer">
              <div className="listproduct-format-main listproduct-format">
                <img
                  className="listproduct-product-icon"
                  src={e.image}
                  alt="productPreview"
                />
                <p>{e.name}</p>
                <p>${e.old_price}</p>
                <p>${e.new_price}</p>
                <p>{e.category}</p>
                <img
                  className="listproduct-remove-icon"
                  onClick={() => {
                    removeProduct(e.id);
                  }}
                  src={cross_icon}
                  alt="X"
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
