import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNotificationAction,
  deleteNotificationAction,
  getAllNotifications,
} from "../serviceAction/MenuActions";
import dayjs from "dayjs";

export function useNotifications(selectedDates: [dayjs.Dayjs, dayjs.Dayjs]) {
  const {
    isPending: loading,
    data: notifications = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      getAllNotifications(
        selectedDates?.[0]?.format("YYYY-MM-DD"),
        selectedDates?.[1]?.format("YYYY-MM-DD")
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, notifications, isError, error, refetch };
}
export function useDeleteNotification() {
  const { mutate: deleteNotification, isPending: isdeleting } = useMutation({
    mutationFn: deleteNotificationAction,
  });
  return { isdeleting, deleteNotification };
}
export function useAddNotification() {
  const { mutate: addNotification, isPending: isAdding } = useMutation({
    mutationFn: addNotificationAction,
  });
  return { isAdding, addNotification };
}
