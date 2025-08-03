import { api } from "../utils/AxiosInstance";
import { IDiscount, ICommission, ILedger, IJournal } from "../utils/type";
// service for Ledgers
export const getLedgers = async () => await api.get(`admin/ledgers`);
export const getLedger = async (id: string) =>
  await api.get(`admin/ledger/${id}`);
export const addLedger = async (payload: ILedger) =>
  await api.post(`admin/ledger/add`, payload);
export const deleteLedger = async (id: number) =>
  await api.delete(`admin/ledger/${id}/delete`);
// service for Journals
export const getJournals = async () => await api.get(`admin/journals`);
export const getJournal = async (id: string) =>
  await api.get(`admin/journal/${id}`);
export const addJournal = async (payload: IJournal) =>
  await api.post(`admin/journal/add`, payload);
export const deleteJournal = async (id: number) =>
  await api.delete(`admin/journal/${id}/delete`);
// service for commissions
export const getCommissions = async () => await api.get(`admin/commissions`);
export const getCommission = async (id: string) =>
  await api.get(`admin/commission/${id}`);
export const addCommission = async (payload: ICommission) =>
  await api.post(`admin/commission/add`, payload);
export const deleteCommission = async (id: number) =>
  await api.delete(`admin/commission/${id}/delete`);
// service for discounts
export const getDiscounts = async () => await api.get(`admin/discounts`);
export const getDiscount = async (id: string) =>
  await api.get(`admin/discount/${id}`);
export const addDiscount = async (payload: IDiscount) =>
  await api.post(`admin/discount/add`, payload);
export const deleteDiscount = async (id: number) =>
  await api.delete(`admin/discount/${id}/delete`);
