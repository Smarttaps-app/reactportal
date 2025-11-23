import {
  addSupportTicket,
  assignSupportTicket,
  changePassword,
  disableCustomerAccount,
  getCustomer,
  getCustomers,
  getSupportTickets,
  replySupportTicket,
  resetCustomerPassword,
  supportTicket,
} from "../services/CustomerService";
import { IChangePassword, ISupportTicket } from "../utils/type";

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
export async function getCustomerAction(id: string | number) {
  const response = await getCustomer(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function changePasswordAction(payload: IChangePassword) {
  const response = await changePassword(payload);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for admin

export async function getSupportTicketsAction(startDate = "", endDate = "") {
  console.log(startDate, endDate);
  const response = await getSupportTickets(startDate, endDate);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addSupportTicketAction(payload: ISupportTicket) {
  const response = await addSupportTicket(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function assignSupportTicketAction(payload: ISupportTicket) {
  const response = await assignSupportTicket(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function replySupportTicketAction(payload: ISupportTicket) {
  const response = await replySupportTicket(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function supportTicketAction(payload: {
  id: number;
  action: string;
}) {
  const response = await supportTicket(payload.id, payload.action);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}

export async function resetCustomerPasswordAction(id: string | number) {
  const response = await resetCustomerPassword(id);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function disableCustomerAccountAction(id: string | number) {
  const response = await disableCustomerAccount(id);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data;
  }
  throw new Error(response.data);
}
