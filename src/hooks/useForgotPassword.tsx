import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { Common } from "../utils/Common";
import { forgotPasswordAction } from "../reducers/AuthActions";

export const useForgotPassword = () => {
  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: forgotPasswordAction,
    onError: (error) => {
      console.error(error);
      console.error(error.message);
      message.error(Common.formatError(error));
    },
  });
  return { forgotPassword, isPending };
};
