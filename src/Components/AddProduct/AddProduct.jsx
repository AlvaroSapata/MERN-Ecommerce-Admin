import React, { useState } from "react";
import upload_area from "../Assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const AddProduct = async () => {
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={AddProduct}>
          <div className="field--wrapper">
            <label>
              Product Name
              <input
                required
                type="text"
                name="productName"
                placeholder="Enter product name..."
                value={productDetails.name}
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Product Price
              <input
                required
                type="text"
                name="productPrice"
                placeholder="Enter product price..."
                value={productDetails.old_price}
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </label>
          </div>

          <div className="field--wrapper">
            <label>
              Product Offer Price
              <input
                required
                type="text"
                name="productOfferPrice"
                placeholder="Enter product offer price..."
                value={productDetails.new_price}
                onChange={(e) => {
                  changeHandler(e);
                }}
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
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
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
                className=""
                src={!image ? upload_area : URL.createObjectURL(image)}
                alt="Selected Image"
              />
              <input
                onChange={(e) => {
                  imageHandler(e);
                }}
                type="file"
                name="image"
                id="file-input"
                hidden
              />
            </label>
          </div>

          <div className="field--wrapper">
            <input
            style={{width: "80%", margin: "auto"}}
              type="submit"
              value="Add Product"
              className="btn btn--main"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
