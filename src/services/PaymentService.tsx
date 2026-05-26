import { api } from "../utils/AxiosInstance";
import {
  AddCashoutBank,
  ICashout,
  ICashoutLimit,
  ICashoutOTP,
  ICashoutWithdraw,
} from "../utils/type";

// get banks
export const getBanks = () => api.get(`admin/banks`);
// service for Payments
export function getPayments(
  startDate?: string | null,
  endDate?: string | null,
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/payments`, {
    params,
  });
}
export function getLastTenDaysPayments() {
  return api.get(`admin/payment-analytics`);
}

export const getPayment = async (id: string) =>
  await api.get(`admin/payment/${id}`);

// service for cashout
export function getCashouts(
  startDate?: string | null,
  endDate?: string | null,
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/cashouts`, {
    params,
  });
}
export const verifyCashoutBank = async (payload: AddCashoutBank) =>
  await api.post(`admin/cashout/bank-verification`, payload);
export const addCashoutBank = async (payload: AddCashoutBank) =>
  await api.post(`admin/cashout/add-bank-account`, payload);
export const cashoutLimitIncrease = async (payload: ICashoutLimit) =>
  await api.post(`admin/cashout/limit`, payload);
export const cashoutWithdrawal = async (payload: ICashoutWithdraw) =>
  await api.post(`admin/cashout/withdraw`, payload);
export const cashoutRequestConfirmation = async (payload: ICashoutOTP) =>
  await api.post(`admin/cashout/confirmation-check`, payload);
export const approveCashout = async (id: string) =>
  await api.get(`admin/cashout/${id}/approve`);
export const rejectCashout = async (id: string) =>
  await api.get(`admin/cashout/${id}/reject`);
export const cashout = async (id: number | undefined) =>
  await api.get(`admin/cashout/${id}`);

export const addCashout = async (payload: ICashout) =>
  await api.post(`admin/cashout/add`, payload);
export function getRevenues(
  startDate?: string | null,
  endDate?: string | null,
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/revenue`, {
    params,
  });
}
