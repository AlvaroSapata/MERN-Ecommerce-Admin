import service from "./config.services";

const getProductService = () => {
  return service.get("/products/all");
};

const getProductDetailsService = (productId) => {
  return service.get(`/products/${productId}`);
};

const addProductService = (newProduct) => {
  return service.post("/products/add", newProduct);
};

const updateProductService = (productId, updatedProduct) => {
  return service.put(`/products/edit/${productId}`, updatedProduct);
};

const deleteProductService = (productId) => {
  return service.delete(`/products/delete/${productId}`);
};

export {
  getProductService,
  getProductDetailsService,
  addProductService,
  updateProductService,
  deleteProductService,
};
