import api from "../api";

const changePasswordApi = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const response = await api.put(`/users/change-password`, {
    userId,
    oldPassword,
    newPassword,
  });
  return response.data;
};

export default changePasswordApi;
