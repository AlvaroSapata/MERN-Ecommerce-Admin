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
    setIsLoading(true);
    fetch("http://localhost:5005/products/all")
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No hay productos.") {
          setAllProducts([]);
        } else {
          setAllProducts(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  };
  

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = (id, name) => {
    setProductIdToRemove(id);
    setProductNameToRemove(name);
    setShowConfirmation(true);
  };

  const confirmRemoveProduct = async () => {
    try {
      await fetch(
        `http://localhost:5005/products/delete/${productIdToRemove}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      fetchInfo();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error removing product:", error);
      // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
    }
  };

  const cancelRemoveProduct = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="listproduct">
      <h3>Products List</h3>
      {allproducts.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div>
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
                        removeProduct(e._id, e.name);
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
      )}
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
