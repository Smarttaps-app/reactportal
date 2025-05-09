import { api } from "../utils/AxiosInstance";
import {
  IForgotPasswordRequest,
  ILogin,
  IResetPasswordRequest,
} from "../utils/type";

export const login = async (payload: ILogin) =>
  await api.post(`admin/login`, payload);
export function forgotPassword(payload: IForgotPasswordRequest) {
  return api.post(`admin/forgot-password/initiate`, payload);
}

export function resetPassword(payload: IResetPasswordRequest) {
  return api.post(`admin/forgot-password/final`, payload);
}
