import { api } from "../utils/AxiosInstance";
import { IBusType, ISchedule } from "../utils/type";

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
// service for buses
export const getSchedules = async () => await api.get(`admin/bus-schedules`);
export const getSchedule = async (id: string) =>
  await api.get(`admin/bus-schedule/${id}`);
export const addSchedule = async (payload: ISchedule) =>
  await api.post(`admin/bus-schedule/add`, payload);
export const deleteSchedule = async (id: string) =>
  await api.delete(`admin/bus-schedule/${id}/delete`);
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
