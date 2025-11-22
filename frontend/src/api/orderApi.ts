export const createAbandonOrderApi = async (orderData: any) => {
  const res = await axios.post(BASE_URL + '/abandon', orderData);
  return res.data;
};

export const completeAbandonOrderApi = async (orderData: any) => {
  const res = await axios.put(BASE_URL + '/abandon/complete', orderData);
  return res.data;
};
import axios from 'axios';

const BASE_URL = '/api/order';

export const createOrderApi = async (orderData: any) => {
  const res = await axios.post(BASE_URL, orderData);
  return res.data;
};

export const getOrderApi = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const getOrdersApi = async (params?: { userId?: string; guestId?: string }) => {
  const res = await axios.get(BASE_URL, { params });
  return res.data;
};
