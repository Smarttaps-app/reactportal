import { getTickets, getTicket } from "../services/TicketService";

// action for payment
export async function getTicketsAction(startDate = "", endDate = "") {
  console.log(startDate, endDate);
  const response = await getTickets(startDate, endDate);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getTicketAction(id: string | number) {
  const response = await getTicket(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
