import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  getLastTenDaysPaymentsAction,
  getPaymentsAction,
} from "../serviceAction/PaymentActions";
export function usePayments(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: payments = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: () =>
      getPaymentsAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, payments, isError, error, refetch };
}
export function usePayment10Days() {
  const { isPending: loading, data: payments = [] } = useQuery({
    queryKey: ["10payments"],
    queryFn: getLastTenDaysPaymentsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, payments };
}
