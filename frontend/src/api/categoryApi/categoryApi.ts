import api from "../api";

export const createCategoryApi = async (formData: FormData) => {
  const response = await api.post("/category/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // now returns full category object
};

export const getCategoriesApi = async () => {
  const response = await api.get("/category/");
  return response.data;
};
