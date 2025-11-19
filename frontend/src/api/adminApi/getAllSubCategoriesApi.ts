import api from "../api";

// Lấy tất cả subcategories
const getAllSubCategoriesApi = async () => {
  try {
    const response = await api({
      url: "/subcategory",
      method: "GET",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default getAllSubCategoriesApi;
