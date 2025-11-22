import axios from "axios";

export const getRevenueApi = async (params?: { type?: string; startDate?: string; endDate?: string }) => {
  const res = await axios.get("/api/revenue", { params });
  return res.data;
};
