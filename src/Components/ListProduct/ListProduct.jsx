import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListProduct.css";
import cross_icon from "../Assets/x-symbol.svg";
import edit_icon from "../Assets/edit.svg";
import ConfirmationModal from "../RemoveProduct/RemoveProduct";
import { BounceLoader } from "react-spinners";
import {
  getProductService,
  deleteProductService
} from "../../utils/product.services";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  const [productNameToRemove, setProductNameToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const data = await getProductService();
      if (data.message === "No hay productos.") {
        setAllProducts([]);
      } else {
        setAllProducts(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeProduct = (id, name) => {
    setProductIdToRemove(id);
    setProductNameToRemove(name);
    setShowConfirmation(true);
  };

  const confirmRemoveProduct = async () => {
    try {
      await deleteProductService(productIdToRemove);
      fetchInfo();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error removing product:", error);
      // Handle error as needed
    }
  };

  const cancelRemoveProduct = () => {
    setShowConfirmation(false);
  };

  // Función para capitalizar la primera letra de una cadena
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="listproduct">
      <h3>Products List</h3>
      {isLoading && (
        <div className="spinner">
          <BounceLoader color="#db1a5a" />
        </div>
      )}

      {!isLoading && allproducts.length === 0 && (
        <p>No hay productos disponibles.</p>
      )}

      {!isLoading && allproducts.length > 0 && (
        <div>
          <div className="listproduct-format-main">
            <p></p>
            <p>Name</p>
            <p>Price</p>
            <p>Offer</p>
            <p>Category</p>
            <p></p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((e) => {
              return (
                <div key={e._id} className="listproduct-fixer">
                  <div className="listproduct-format-main listproduct-format">
                    <img
                      className="listproduct-product-icon"
                      src={e.image}
                      alt="Product"
                    />
                    <p>{e.name}</p>
                    <p>${e.old_price}</p>
                    <p>${e.new_price}</p>
                    <p>{capitalizeFirstLetter(e.category)}</p> {/* Capitalizar la primera letra */}
                    <img
                      className="listproduct-remove-icon"
                      onClick={() => {
                        removeProduct(e._id, e.name);
                      }}
                      src={cross_icon}
                      alt="X"
                    />
                    <Link to={`/editproduct/${e._id}`}>
                      <div className="listproduct-edit-container">
                        <img
                          src={edit_icon}
                          alt="Edit"
                          className="listproduct-edit-icon"
                        />
                      </div>
                    </Link>
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
