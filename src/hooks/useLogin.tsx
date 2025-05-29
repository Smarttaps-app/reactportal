import { useMutation } from "@tanstack/react-query";
import { Common } from "../utils/Common";
import { loginAction } from "../serviceAction/AuthActions";
import { message } from "antd";

export const useLogin = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginAction,
    onError: (error) => {
      console.error(error);
      console.error(error.message);
      message.error(Common.formatError(error));
    },
  });
  return { login, isPending };
};
export const useChangePassword = () => {
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: loginAction,
  });
  return { changePassword, isPending };
};
