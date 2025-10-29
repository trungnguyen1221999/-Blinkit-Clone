import api from "../api";

const getUserApi = async (userId: string) => {
  const response = await api.get(`/user/user-info/${userId}`);
  return response.data;
};

export default getUserApi;
