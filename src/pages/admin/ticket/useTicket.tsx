import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  getTicketAction,
  getTicketsAction,
} from "../../../serviceAction/TicketActions";
export function useTickets(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: tickets = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tickets", selectedDates],
    queryFn: () =>
      getTicketsAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, tickets, isError, error, refetch };
}

export function useTicket(id: string | number) {
  const {
    isPending: loading,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketAction(id),
    refetchOnWindowFocus: false,
  });
  return { loading, ticket, error };
}
