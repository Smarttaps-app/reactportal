import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getPaymentsAction } from "../serviceAction/PaymentActions";
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
