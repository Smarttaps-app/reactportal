import { getCustomer, getCustomers } from "../services/CustomerService";

// action for Customer
export async function getCustomersAction(startDate = "", endDate = "") {
  console.log(startDate, endDate);
  const response = await getCustomers(startDate, endDate);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getCustomerAction(id: string) {
  const response = await getCustomer(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
