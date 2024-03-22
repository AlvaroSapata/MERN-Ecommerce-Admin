import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/x-symbol.svg";
import ConfirmationModal from "../RemoveProduct/RemoveProduct";

const ListProduct = ({ setIsLoading }) => {
  const [allproducts, setAllProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  const [productNameToRemove, setProductNameToRemove] = useState(null);

  const fetchInfo = () => {
    setIsLoading(true); // Establecer isLoading a true al iniciar la solicitud de fetch
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false); // Establecer isLoading a false cuando la solicitud de fetch está completa
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = (id,name) => {
    setProductIdToRemove(id);
    setProductNameToRemove(name);
    setShowConfirmation(true);
  };

  const confirmRemoveProduct = async () => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productIdToRemove }),
    });

    fetchInfo();
    setShowConfirmation(false);
  };

  const cancelRemoveProduct = () => {
    setShowConfirmation(false);
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
                    removeProduct(e.id, e.name);
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
      {showConfirmation && (
        <ConfirmationModal
          productName={productNameToRemove}
          productId={productIdToRemove}
          onConfirm={confirmRemoveProduct}
          onCancel={cancelRemoveProduct}
        />
      )}
    </div>
  );
};

export default ListProduct;
