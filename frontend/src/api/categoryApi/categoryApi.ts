import api from "../api";

export const createCategoryApi = async (formData: FormData) => {
  const response = await api.post("/category/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // returns full category object
};

export const getCategoriesApi = async () => {
  const response = await api.get("/category/");
  return response.data;
};

export const deleteCategoryApi = async (categoryId: string) => {
  const response = await api.delete(`/category/delete/${categoryId}`);
  return response.data;
};

// ✅ Update category API
export const updateCategoryApi = async (
  categoryId: string,
  formData: FormData
) => {
  const response = await api.put(`/category/edit/${categoryId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data; // returns updated category object
};
