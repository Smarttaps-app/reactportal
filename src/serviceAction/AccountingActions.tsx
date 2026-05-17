import {
  getJournals,
  getJournal,
  getCommissions,
  getCommission,
  getLedgers,
  getDiscounts,
  addLedger,
  deleteLedger,
  deleteDiscount,
  addDiscount,
  deleteCommission,
  addCommission,
  addJournal,
  deleteJournal,
  toggleDiscount,
  getPostingRules,
  addPostingRule,
  deletePostingRule,
  getGlTransactions,
} from "../services/AccountingService";
import {
  IDiscount,
  ILedger,
  IJournal,
  ICommission,
  IPostingRule,
} from "../utils/type";
import dayjs from "dayjs";
// action for Ledger
export async function getLedgersAction() {
  const response = await getLedgers();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addLedgerAction(payload: ILedger) {
  const response = await addLedger(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteLedgerAction(id: number) {
  const response = await deleteLedger(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function toggleDiscountAction(id: number) {
  const response = await toggleDiscount(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Journals
export async function getJournalsAction() {
  const response = await getJournals();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getJournalAction(id: string) {
  const response = await getJournal(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addJournalAction(payload: IJournal) {
  const response = await addJournal(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteJournalAction(id: number) {
  const response = await deleteJournal(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Commission
export async function getCommissionsAction() {
  const response = await getCommissions();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getCommissionAction(id: string) {
  const response = await getCommission(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addCommissionAction(payload: ICommission) {
  const response = await addCommission(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteCommissionAction(id: number) {
  const response = await deleteCommission(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Ledger
export async function getDiscountsAction() {
  const response = await getDiscounts();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addDiscountAction(payload: IDiscount) {
  const response = await addDiscount(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteDiscountAction(id: number) {
  const response = await deleteDiscount(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Park
export async function getPostingRulesAction() {
  const response = await getPostingRules();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addPostingRuleAction(payload: IPostingRule) {
  const response = await addPostingRule(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deletePostingRuleAction(id: string) {
  const response = await deletePostingRule(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}

// action for General ledger Transactions
export async function getGlTransactionsAction(
  selectedDates: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
) {
  const response = await getGlTransactions(
    selectedDates?.[0]?.format("YYYY-MM-DD"),
    selectedDates?.[1]?.format("YYYY-MM-DD"),
  );
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
