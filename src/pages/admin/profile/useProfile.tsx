import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../../../serviceAction/CustomerActions";

export const useChangePassword = () => {
  const { mutate: changePassword, isPending: loading } = useMutation({
    mutationFn: changePasswordAction,
  });
  return { changePassword, loading };
};
