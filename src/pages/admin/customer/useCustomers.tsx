import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  disableCustomerAccountAction,
  getCustomerAction,
  getCustomersAction,
  resetCustomerPasswordAction,
} from "../../../serviceAction/CustomerActions";
import { App } from "antd";
import { Common } from "../../../utils/Common";
export function useCustomers(
  selectedDates: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
) {
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
        selectedDates?.[1]?.format("YYYY-MM-DD"),
      ),
    refetchOnWindowFocus: false,
  });
  return { loading, customers, error, refetch };
}

export function useCustomer(id: string | number) {
  const {
    isPending: loading,
    data,
    error,
  } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerAction(id),
    refetchOnWindowFocus: false,
  });
  return { loading, data, error };
}

export function useResetCustomerPassword() {
  const { message } = App.useApp();
  const { mutate: resetCustomerPassword, isPending: resetting } = useMutation({
    mutationFn: resetCustomerPasswordAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { resetting, resetCustomerPassword };
}
export function useDisableCustomerAccount() {
  const { message } = App.useApp();
  const { mutate: disableCustomer, isPending: disabling } = useMutation({
    mutationFn: disableCustomerAccountAction,
    onError: (error) => {
      message.error(Common.formatError(error));
    },
  });
  return { disabling, disableCustomer };
}
