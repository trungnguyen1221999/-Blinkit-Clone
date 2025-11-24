import api from "./api";

const BASE_URL = '/order';

export const createAbandonOrderApi = async (orderData: any) => {
  const res = await api.post(BASE_URL + '/abandon', orderData);
  return res.data;
};

export const completeAbandonOrderApi = async (orderData: any) => {
  const res = await api.put(BASE_URL + '/abandon/complete', orderData);
  return res.data;
};


export const createOrderApi = async (orderData: any) => {
  const res = await api.post(BASE_URL, orderData);
  return res.data;
};

export const getOrderApi = async (id: string) => {
  const res = await api.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const getOrdersApi = async (params?: { userId?: string; guestId?: string }) => {
  const res = await api.get(BASE_URL, { params });
  return res.data;
};
