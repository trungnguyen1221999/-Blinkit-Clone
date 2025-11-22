import axios from "axios";

export const getOrdersAdminApi = async (params?: { type?: string; startDate?: string; endDate?: string }) => {
  const res = await axios.get("/api/order", { params });
  return res.data;
};
