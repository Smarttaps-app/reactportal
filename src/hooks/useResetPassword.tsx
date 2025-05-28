import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction } from "../serviceAction/AuthActions";

export const useResetPassword = () => {
  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordAction,
  });
  return { resetPassword, isPending };
};
