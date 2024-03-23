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
    fetch("http://localhost:5005/products/all") // Cambia la URL para que coincida con la ruta en el backend
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false); // Establecer isLoading a false cuando la solicitud de fetch está completa
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Asegúrate de que isLoading se establezca en false incluso en caso de error
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
