import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  withCredentials: true, // để gửi cookie HttpOnly
});

export const setupInterceptors = (accessToken: string | null) => {
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers!["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });
};

export default api;
