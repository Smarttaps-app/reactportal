import { api } from "../utils/AxiosInstance";
import { IBusType } from "../utils/type";

// service for bus types
export const getBusProviders = async () => await api.get(`admin/bus-providers`);
export const getBusTypes = async () => await api.get(`admin/bus-types`);
export const getBusType = async (id: string) =>
  await api.get(`admin/bus-type/${id}`);
export const addBusType = async (payload: IBusType) =>
  await api.post(`admin/bus-type/add`, payload);
export const deleteBusType = async (id: number) =>
  await api.delete(`admin/bus-type/${id}/delete`);
export const getRoutesViaAdmin = async (id: number) =>
  await api.get(`admin/routes/${id}`);
export const getBusesViaAdmin = async (id: number) =>
  await api.get(`admin/buses/${id}`);
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

export const getPayment = async (id: string) =>
  await api.get(`admin/payment/${id}`);
