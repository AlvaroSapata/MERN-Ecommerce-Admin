import service from "./config.services";

const getProductService = () => {
    return service.get("/products/all");
};

const addProductService = (newProduct) => {
    return service.post("/products/add", newProduct);
};

const updateProductService = (productId, updatedProduct) => {
    return service.put(`/products/update/${productId}`, updatedProduct);
};

const deleteProductService = (productId) => {
    return service.delete(`/products/delete/${productId}`);
};

export { getProductService, addProductService, updateProductService, deleteProductService };