import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  addCashoutBankAction,
  approveCashoutAction,
  cashoutLimitIncreaseAction,
  cashoutRequestConfirmationAction,
  cashoutWithdrawalAction,
  getCashoutsAction,
  rejectCashoutAction,
  verifyCashoutBankAction,
} from "../../../serviceAction/PaymentActions";
import { App } from "antd";
import { Common } from "../../../utils/Common";
export function useCashouts(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: cashouts = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cashouts", selectedDates],
    queryFn: () =>
      getCashoutsAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, cashouts, isError, error, refetch };
}
export function useCashoutBankVerification() {
  const { message } = App.useApp();
  const { mutate: verifyCashoutAccount, isPending: verifying } = useMutation({
    mutationFn: verifyCashoutBankAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { verifying, verifyCashoutAccount };
}
export function useAddCashoutAccount() {
  const { message } = App.useApp();
  const { mutate: addCashoutAccount, isPending: isAdding } = useMutation({
    mutationFn: addCashoutBankAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addCashoutAccount };
}
export function useCashoutLimitIncrease() {
  const { message } = App.useApp();
  const { mutate: cashoutLimitIncrease, isPending: limiting } = useMutation({
    mutationFn: cashoutLimitIncreaseAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { limiting, cashoutLimitIncrease };
}
export function useCashoutWithdrawal() {
  const { message } = App.useApp();
  const { mutate: cashoutWithdrawal, isPending: withdrawing } = useMutation({
    mutationFn: cashoutWithdrawalAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { withdrawing, cashoutWithdrawal };
}
export function useCashoutConfirmation() {
  const { message } = App.useApp();
  const { mutate: cashoutRequestConfirmation, isPending: confirming } =
    useMutation({
      mutationFn: cashoutRequestConfirmationAction,
      onError: (error) => {
        message.error(Common.formatError(error));
      },
    });
  return { confirming, cashoutRequestConfirmation };
}
export function useCashoutApproval() {
  const { message } = App.useApp();
  const { mutate: approved, isPending: isApproving } = useMutation({
    mutationFn: approveCashoutAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { isApproving, approved };
}
export function useCashoutReject() {
  const { message } = App.useApp();
  const { mutate: rejected, isPending: rejecting } = useMutation({
    mutationFn: rejectCashoutAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { rejecting, rejected };
}
