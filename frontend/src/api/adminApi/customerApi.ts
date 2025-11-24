import api from "../api";

export const getCustomersApi = async () => {
  const res = await api.get("/api/customer");
  return res.data;
};
