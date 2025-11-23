import { api } from "../utils/AxiosInstance";
import { IChangePassword, ISupportTicket } from "../utils/type";

// service for Customers
export function getCustomers(
  startDate?: string | null,
  endDate?: string | null
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/customers`, {
    params,
  });
}

export const getCustomer = async (id: string | number) =>
  await api.get(`admin/customer/${id}`);

export function changePassword(payload: IChangePassword) {
  return api.post(`admin/change-password`, payload);
}
// service for SupportTicket
export function getSupportTickets(
  startDate?: string | null,
  endDate?: string | null
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/support-tickets`, {
    params,
  });
}
export const addSupportTicket = async (payload: ISupportTicket) =>
  await api.post(`admin/support-ticket/add`, payload);
export const assignSupportTicket = async (payload: ISupportTicket) =>
  await api.post(`admin/support-ticket/assign`, payload);
export const replySupportTicket = async (payload: ISupportTicket) =>
  await api.post(`admin/support-ticket/reply`, payload);
export const supportTicket = async (id: number, action: string) =>
  await api.delete(`admin/support-ticket/${id}/${action}`);
export const resetCustomerPassword = async (id: string | number) =>
  await api.get(`admin/customer/${id}/resetpassword`);
export const disableCustomerAccount = async (id: string | number) =>
  await api.get(`admin/customer/${id}/disable-account`);
