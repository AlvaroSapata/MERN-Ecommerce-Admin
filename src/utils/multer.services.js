import service from "./config.services";

const multerService = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    // Aquí llamamos al servicio de Multer en el backend
    const response = await service.post("/multer/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export { multerService };