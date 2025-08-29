import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  const { mutate: changePassword, isPending: loading } = useMutation({
    mutationFn: loginAction,
  });
  return { changePassword, loading };
};
export const useCashOut = () => {
  const { mutate: cashout, isPending: loading } = useMutation({
    mutationFn: loginAction,
  });
  return { cashout, loading };
};
