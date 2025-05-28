import { api } from "../utils/AxiosInstance";
// service for Routes
export const getRoutes = async () => await api.get(`admin/routes`);
export const getRoute = async (id: string) =>
  await api.get(`admin/route/${id}`);
// service for Stations
export const getStations = async () => await api.get(`admin/stations`);
export const getStation = async (id: string) =>
  await api.get(`admin/station/${id}`);
// service for parks
export const getParks = async () => await api.get(`admin/parks`);
export const getPark = async (id: string) => await api.get(`admin/park/${id}`);

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
