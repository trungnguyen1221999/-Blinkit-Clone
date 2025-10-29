import api from "../api";

const changeAvatarApi = async (): Promise<void> => {
  const response = await api.put("/user/upload-avatar");
  return response.data;
};

export default changeAvatarApi;
