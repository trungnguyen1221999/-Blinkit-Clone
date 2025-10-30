import api from "../api";

const getAllUsersApi = async () => {
  const response = await api.get("/user/admin/all-users");
  return response.data;
};

export default getAllUsersApi;
