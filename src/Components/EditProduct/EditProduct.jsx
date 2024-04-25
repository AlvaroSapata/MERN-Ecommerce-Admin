import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import {
  getProductDetailsService,
  updateProductService,
} from "../../utils/product.services";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductDetailsService(id);
        setProduct(response.product);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "choose",
    new_price: "",
    old_price: "",
  });

  useEffect(() => {
    if (product) {
      setProductDetails({
        name: product.name,
        image: product.image,
        category: product.category,
        new_price: product.new_price,
        old_price: product.old_price,
      });
    }
  }, [product]);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const updatedProductData = {
        name: productDetails.name,
        category: productDetails.category,
        new_price: productDetails.new_price,
        old_price: productDetails.old_price,
      };

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const uploadResponse = await fetch("https://lagrima-server.adaptable.app/multer/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success) {
          updatedProductData.image = uploadData.image_url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      if (product && product._id) { // Verifica que product y product._id existan
        const response = await updateProductService(product._id, updatedProductData);

        if (response.product) {
          alert("Product updated successfully");
          navigate("/listproduct");
        } else {
          alert("Failed to update product");
        }
      } else {
        throw new Error("Product or product ID is missing");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <BounceLoader color="#db1a5a" />
      </div>
    );
  }

  return (
    <div className="auth--container">
      <h3>Edit Product</h3>
      <div className="form--wrapper">
        <form onSubmit={updateProduct}>
          <div className="field--wrapper">
            <label>
              Product Name
              <input
                required
                type="text"
                name="name"
                placeholder="Enter product name..."
                value={productDetails.name}
                onChange={changeHandler}
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Product Price
              <input
                required
                type="number"
                name="old_price"
                placeholder="Enter product price..."
                value={productDetails.old_price}
                onChange={changeHandler}
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Product Offer Price
              <input
                required
                type="number"
                name="new_price"
                placeholder="Enter product offer price..."
                value={productDetails.new_price}
                onChange={changeHandler}
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Product Category
              <select
                required
                name="category"
                value={productDetails.category}
                onChange={changeHandler}
                className="category-select"
                style={{
                  color:
                    productDetails.category === "choose" ? "grey" : "white",
                }}
              >
                <option value="choose" disabled>
                  Choose category...
                </option>
                <option value="t-shirts">T-shirt</option>
                <option value="hoodies">Hoodie</option>
                <option value="misc">Miscellaneus</option>
              </select>
            </label>
          </div>

          <div className="field--wrapper">
            <label className="field--wrapper">
              Product Image
              <img
                style={{
                  maxWidth: "200px",
                  width: "auto",
                  borderRadius: "15px",
                  border: "1px solid grey",
                  cursor: "pointer",
                }}
                src={!image ? productDetails.image : URL.createObjectURL(image)}
                alt="SelectedImage"
              />
              <input
                onChange={imageHandler}
                type="file"
                name="image"
                id="file-input"
                hidden
              />
            </label>
          </div>

          <div className="field--wrapper">
            <input
              style={{ width: "80%", margin: "auto" }}
              type="submit"
              value="Update Product"
              className="btn btn--main"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
