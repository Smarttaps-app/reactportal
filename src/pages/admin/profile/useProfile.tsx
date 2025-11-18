import { useMutation, useQuery } from "@tanstack/react-query";
import { changePasswordAction } from "../../../serviceAction/CustomerActions";
import {
  addCashoutBankAction,
  getBanksAction,
} from "../../../serviceAction/PaymentActions";

export function useBanks() {
  const {
    isPending: loading,
    data: banks = [],
    error,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanksAction,
  });
  return { loading, banks, error };
}

export const useChangePassword = () => {
  const { mutate: changePassword, isPending: loading } = useMutation({
    mutationFn: changePasswordAction,
  });
  return { changePassword, loading };
};
export const useCashoutBank = () => {
  const { mutate: addBank, isPending: loading } = useMutation({
    mutationFn: addCashoutBankAction,
  });
  return { addBank, loading };
};
export const useCashoutLimitIncrease = () => {
  const { mutate: addBank, isPending: loading } = useMutation({
    mutationFn: addCashoutBankAction,
  });
  return { addBank, loading };
};
export const useCashoutWithdrawal = () => {
  const { mutate: addBank, isPending: loading } = useMutation({
    mutationFn: addCashoutBankAction,
  });
  return { addBank, loading };
};

export const useOTP = () => {
  const { mutate: addBank, isPending: loading } = useMutation({
    mutationFn: addCashoutBankAction,
  });
  return { addBank, loading };
};
