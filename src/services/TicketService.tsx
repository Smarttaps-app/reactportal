import { api } from "../utils/AxiosInstance";

// service for Payments
export function getTickets(startDate?: string | null, endDate?: string | null) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/tickets`, {
    params,
  });
}

export const getTicket = async (id: string) =>
  await api.get(`admin/ticket/${id}`);
