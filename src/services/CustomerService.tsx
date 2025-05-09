import { api } from "../utils/AxiosInstance";

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

export const getCustomer = async (id: string) =>
  await api.get(`admin/customer/${id}`);
