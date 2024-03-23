import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const response = await fetch(`http://localhost:5005/products/${id}`);
        console.log("Response from server:", response);
        const data = await response.json();
        console.log("Data received from server:", data);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Product</h2>
      <h2>_id: {product._id}</h2>
      <p>Name: {product.name}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      {/* Agregar más campos según la estructura de tu objeto de producto */}
    </div>
  );
};

export default EditProduct;
