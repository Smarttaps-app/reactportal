import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getTicketsAction } from "../serviceAction/TicketActions";
export function useTicket(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: tickets = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () =>
      getTicketsAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, tickets, isError, error, refetch };
}
