import { forgotPassword, login, resetPassword } from "../services/AuthService";
import {
  IForgotPasswordRequest,
  ILogin,
  IResetPasswordRequest,
} from "../utils/type";

export async function loginAction(payload: ILogin) {
  const response = await login(payload);
  console.log(response);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function forgotPasswordAction(payload: IForgotPasswordRequest) {
  const response = await forgotPassword(payload);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function resetPasswordAction(payload: IResetPasswordRequest) {
  const response = await resetPassword(payload);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data;
  }
  throw new Error(response.data);
}
