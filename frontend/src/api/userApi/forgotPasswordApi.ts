import api from "../api";

const forgotPasswordApi = async (email: string): Promise<void> => {
  const response = await api.put("/user/forgot-password", { email });
  return response.data;
};

export default forgotPasswordApi;

export const verifyOtpForgotPasswordApi = async (
  email: string,
  otp: string
): Promise<void> => {
  const response = await api.put("/user/verify-forgot-password-otp", {
    email,
    otp,
  });
  return response.data;
};
