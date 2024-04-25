import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import upload_area from "../Assets/upload_area.svg";
import { addProductService } from "../../utils/product.services";
// import { multerService } from "../../utils/multer.services";

const AddProduct = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "choose",
    new_price: "",
    old_price: "",
  });

  const AddProduct = async (e) => {
    e.preventDefault();
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append("image", image);

    await fetch("https://lagrima-server.adaptable.app/multer/upload", {
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
      await addProductService(product).then((data) => {
        if (data.success) {
          alert("Product Added", "success");
          navigate("/listproduct");
        } else {
          alert("Failed", "error");
        }
      });
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="auth--container">
      <h3>Add Product</h3>
      <div className="form--wrapper">
        <form onSubmit={AddProduct}>
          <div className="field--wrapper">
            <label>
              Product Name
              <input
                required
                type="text"
                name="name"
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
                type="number"
                name="old_price"
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
                type="number"
                name="new_price"
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
                className="category-select"
                style={{
                  color:
                    productDetails.category === "choose" ? "grey" : "white",
                }}
              >
                <option value="choose" disabled>
                  Choose category...
                </option>
                <option value="t-shirts">T-shirts</option>
                <option value="hoodies">Hoodies</option>
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
                src={!image ? upload_area : URL.createObjectURL(image)}
                alt="SelectedImage"
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
              style={{ width: "80%", margin: "auto" }}
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
