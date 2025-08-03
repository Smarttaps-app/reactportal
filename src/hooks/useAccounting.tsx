import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getJournalsAction,
  getLedgersAction,
  getCommissionsAction,
  getDiscountsAction,
  addLedgerAction,
  deleteLedgerAction,
  addJournalAction,
  deleteJournalAction,
  addCommissionAction,
  deleteCommissionAction,
  addDiscountAction,
  deleteDiscountAction,
} from "../serviceAction/AccountingActions";
import { message } from "antd";
import { Common } from "../utils/Common";
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
  const { mutate: deleteLedger, isPending: isdeleting } = useMutation({
    mutationFn: deleteLedgerAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteLedger };
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
  const { mutate: deleteDiscount, isPending: isdeleting } = useMutation({
    mutationFn: deleteDiscountAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteDiscount };
}
