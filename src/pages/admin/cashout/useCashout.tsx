import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  addCashoutBankAction,
  approveCashoutAction,
  cashoutAction,
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
        selectedDates?.[1]?.format("YYYY-MM-DD"),
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, cashouts, isError, error, refetch };
}
export function useCashoutBankVerification() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: verifyCashoutAccount, isPending: verifying } = useMutation({
    mutationFn: verifyCashoutBankAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Verify Cashout Account",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Verify Cashout Account",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
  });
  return { verifying, verifyCashoutAccount };
}
export function useAddCashoutAccount() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: addCashoutAccount, isPending: isAdding } = useMutation({
    mutationFn: addCashoutBankAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Add Cashout Account",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Add Cashout Account",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
  });
  return { isAdding, addCashoutAccount };
}
export function useCashoutLimitIncrease() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: cashoutLimitIncrease, isPending: limiting } = useMutation({
    mutationFn: cashoutLimitIncreaseAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Cashout Increase Limit",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Cashout Increase Limit",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
  });
  return { limiting, cashoutLimitIncrease };
}
export function useCashoutWithdrawal() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: cashoutWithdrawal, isPending: withdrawing } = useMutation({
    mutationFn: cashoutWithdrawalAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Cashout Withdrawal",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Cashout Withdrawal",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
  });
  return { withdrawing, cashoutWithdrawal };
}
export function useCashoutConfirmation() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: cashoutRequestConfirmation, isPending: confirming } =
    useMutation({
      mutationFn: cashoutRequestConfirmationAction,
      onSuccess: (data) => {
        notification.success({
          description: data.statusDescription,
          message: "Cashout Confirmation",
        });
      },
      onError: (error) => {
        notification.error({
          message: "Cashout Confirmation",
          description: Common.formatError(error),
        });
      },
      onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
    });
  return { confirming, cashoutRequestConfirmation };
}
export function useCashoutApproval() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: approved, isPending: isApproving } = useMutation({
    mutationFn: approveCashoutAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Cashout Approval",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Cashout Approval",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
  });
  return { isApproving, approved };
}
export function useCashoutReject() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: rejected, isPending: rejecting } = useMutation({
    mutationFn: rejectCashoutAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Cashout Rejection",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Cashout Rejection",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["cashouts"] }),
  });
  return { rejecting, rejected };
}
export function useCashout(id: number) {
  const {
    isPending: loading,
    data: cashout,
    error,
  } = useQuery({
    queryKey: ["cashout", id],
    queryFn: () => cashoutAction(id),
    refetchOnWindowFocus: false,
  });
  return { loading, cashout, error };
}
