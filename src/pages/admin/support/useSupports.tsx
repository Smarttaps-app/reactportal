import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  supportTicketAction,
  getSupportTicketsAction,
} from "../../../serviceAction/CustomerActions";
import { App } from "antd";
import { Common } from "../../../utils/Common";

export function useSupportTickets(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: supports = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["supports", selectedDates],
    queryFn: () =>
      getSupportTicketsAction(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, supports, isError, error, refetch };
}

export function useAssignTicket() {
  const { message } = App.useApp();
  const { mutate: assignTicket, isPending: assigning } = useMutation({
    mutationFn: supportTicketAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { assigning, assignTicket };
}

export function useReplyTicket() {
  const { message } = App.useApp();
  const { mutate: replyTicket, isPending: replying } = useMutation({
    mutationFn: supportTicketAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { replying, replyTicket };
}
export function useCloseTicket() {
  const { message } = App.useApp();
  const { mutate: closingTicket, isPending: closing } = useMutation({
    mutationFn: supportTicketAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { closing, closingTicket };
}
