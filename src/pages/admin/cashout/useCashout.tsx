import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  approveCashoutAction,
  getCashoutsAction,
  rejectCashoutAction,
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
    queryKey: ["cashouts"],
    queryFn: () =>
      getCashoutsAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, cashouts, isError, error, refetch };
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
