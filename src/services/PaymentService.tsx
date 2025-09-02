import { api } from "../utils/AxiosInstance";

// service for Payments
export function getPayments(
  startDate?: string | null,
  endDate?: string | null
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/payments`, {
    params,
  });
}

export const getPayment = async (id: string) =>
  await api.get(`admin/payment/${id}`);
// service for cashout
export function getCashouts(
  startDate?: string | null,
  endDate?: string | null
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/cashouts`, {
    params,
  });
}
export const approveCashout = async (id: string) =>
  await api.get(`admin/cashout/${id}/approval`);
export const rejectCashout = async (id: string) =>
  await api.get(`admin/cashout/${id}/reject`);
