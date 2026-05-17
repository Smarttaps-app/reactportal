import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Common } from "../../../utils/Common";
import { App } from "antd";
import {
  getProvidersAction,
  getServicesAction,
} from "../../../serviceAction/ProductActions";
import {
  addCommissionAction,
  addDiscountAction,
  addJournalAction,
  addLedgerAction,
  addPostingRuleAction,
  deleteCommissionAction,
  deleteDiscountAction,
  deleteJournalAction,
  deleteLedgerAction,
  deletePostingRuleAction,
  getCommissionsAction,
  getDiscountsAction,
  getGlTransactionsAction,
  getJournalsAction,
  getLedgersAction,
  getPostingRulesAction,
  toggleDiscountAction,
} from "../../../serviceAction/AccountingActions";
import { getRevenuesAction } from "../../../serviceAction/PaymentActions";
export function useProductServices() {
  const {
    isPending: loading,
    data: services = [],
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServicesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, services, error };
}
export function useProviders() {
  const {
    isPending: loading,
    data: providers = [],
    error,
  } = useQuery({
    queryKey: ["providers"],
    queryFn: getProvidersAction,
    refetchOnWindowFocus: false,
  });
  return { loading, providers, error };
}
export function useLedgers() {
  const {
    isPending: loading,
    data: ledgers = [],
    error,
  } = useQuery({
    queryKey: ["ledgers"],
    queryFn: getLedgersAction,
    refetchOnWindowFocus: false,
  });
  return { loading, ledgers, error };
}
export function useAddLedger() {
  const { message } = App.useApp();
  const { mutate: addLedger, isPending: isAdding } = useMutation({
    mutationFn: addLedgerAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addLedger };
}
export function useDeleteLedger() {
  const { message } = App.useApp();
  const { mutate: deleteLedger, isPending: isdeleting } = useMutation({
    mutationFn: deleteLedgerAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteLedger };
}
export function useToggleLedger() {
  const { message } = App.useApp();
  const { mutate: toggleStatus, isPending: changing } = useMutation({
    mutationFn: toggleDiscountAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { changing, toggleStatus };
}
export function useJournals() {
  const {
    isPending: loading,
    data: journals = [],
    error,
  } = useQuery({
    queryKey: ["journals"],
    queryFn: getJournalsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, journals, error };
}
export function useAddJournal() {
  const { message } = App.useApp();
  const { mutate: addJournal, isPending: isAdding } = useMutation({
    mutationFn: addJournalAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addJournal };
}
export function useDeleteJournal() {
  const { message } = App.useApp();
  const { mutate: deleteJournal, isPending: isdeleting } = useMutation({
    mutationFn: deleteJournalAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteJournal };
}
export function useCommissions() {
  const {
    isPending: loading,
    data: commissions = [],
    error,
  } = useQuery({
    queryKey: ["commissions"],
    queryFn: getCommissionsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, commissions, error };
}
export function useAddCommission() {
  const { message } = App.useApp();
  const { mutate: addCommission, isPending: isAdding } = useMutation({
    mutationFn: addCommissionAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addCommission };
}
export function useDeleteCommission() {
  const { message } = App.useApp();
  const { mutate: deleteCommission, isPending: isdeleting } = useMutation({
    mutationFn: deleteCommissionAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteCommission };
}
export function useDiscounts() {
  const {
    isPending: loading,
    data: discounts = [],
    error,
  } = useQuery({
    queryKey: ["discounts"],
    queryFn: getDiscountsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, discounts, error };
}
export function useAddDiscount() {
  const { message } = App.useApp();
  const { mutate: addDiscount, isPending: isAdding } = useMutation({
    mutationFn: addDiscountAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addDiscount };
}
export function useDeleteDiscount() {
  const { message } = App.useApp();
  const { mutate: deleteDiscount, isPending: isdeleting } = useMutation({
    mutationFn: deleteDiscountAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteDiscount };
}
export function useRevenue(
  selectedDates: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
) {
  const {
    isPending: loading,
    data: payments = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["revenue", selectedDates],
    queryFn: () => getRevenuesAction(selectedDates),
    refetchOnWindowFocus: false,
  });
  return { loading, payments, isError, error, refetch };
}

export function usePostingRules() {
  const {
    isPending: loading,
    data: postingRules = [],
    error,
  } = useQuery({
    queryKey: ["postingrules"],
    queryFn: getPostingRulesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, postingRules, error };
}
export function useAddPostingRule() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: add, isPending: isAdding } = useMutation({
    mutationFn: addPostingRuleAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Add Posting Rule",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Add Posting Rules",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["postingrules"] }),
  });
  return { isAdding, add };
}
export function useDeletePostingRule() {
  const { notification } = App.useApp();
  const client = useQueryClient();
  const { mutate: deleteSchedule, isPending: isdeleting } = useMutation({
    mutationFn: deletePostingRuleAction,
    onSuccess: (data) => {
      notification.success({
        description: data.statusDescription,
        message: "Delete Posting Rules",
      });
    },
    onError: (error) => {
      notification.error({
        message: "Delete Posting Rules",
        description: Common.formatError(error),
      });
    },
    onSettled: () => client.invalidateQueries({ queryKey: ["postingrules"] }),
  });
  return { isdeleting, deleteSchedule };
}

export function useGlTransactions(
  selectedDates: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
) {
  const {
    isPending: loading,
    data: glTransactions = [],
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["glTransactions", selectedDates],
    queryFn: () => getGlTransactionsAction(selectedDates),
    refetchOnWindowFocus: false,
  });
  return { loading, glTransactions, isError, error, refetch };
}
