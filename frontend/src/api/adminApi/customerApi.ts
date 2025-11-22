import axios from "axios";

export const getCustomersApi = async () => {
  const res = await axios.get("/api/customer");
  return res.data;
};
