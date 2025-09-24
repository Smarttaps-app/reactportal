import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getCustomersAction } from "../serviceAction/CustomerActions";
export function useCustomers(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: customers,
    error,
    refetch,
  } = useQuery({
    queryKey: ["customers", selectedDates],
    queryFn: () =>
      getCustomersAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, customers, error, refetch };
}
