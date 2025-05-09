import { getPayment, getPayments } from "../services/PaymentService";

// action for payment
export async function getPaymentsAction(startDate = "", endDate = "") {
  console.log(startDate, endDate);
  const response = await getPayments(startDate, endDate);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getPaymentAction(id: string) {
  const response = await getPayment(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
