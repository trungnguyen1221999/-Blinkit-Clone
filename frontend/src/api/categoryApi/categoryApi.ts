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

export const deleteCategoryApi = async (categoryId: string) => {
  const response = await api.delete(`/category/delete/${categoryId}`);
  return response.data;
};
