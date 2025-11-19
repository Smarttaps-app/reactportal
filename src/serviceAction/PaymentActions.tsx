import {
  addCashout,
  addCashoutBank,
  approveCashout,
  cashoutLimitIncrease,
  cashoutRequestConfirmation,
  cashoutWithdrawal,
  getBanks,
  getCashouts,
  getLastTenDaysPayments,
  getPayment,
  getPayments,
  rejectCashout,
  verifyCashoutBank,
} from "../services/PaymentService";
import {
  AddCashoutBank,
  ICashout,
  ICashoutLimit,
  ICashoutOTP,
  ICashoutWithdraw,
} from "../utils/type";

// action for admin
export async function getBanksAction() {
  const response = await getBanks();
  if (response.status == 200) {
    return response.data.data;
  }
  throw new Error(response.data);
}

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
export async function getLastTenDaysPaymentsAction() {
  const response = await getLastTenDaysPayments();
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
export async function getCashoutsAction(startDate = "", endDate = "") {
  console.log(startDate, endDate);
  const response = await getCashouts(startDate, endDate);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}

export async function addCashoutAction(payload: ICashout) {
  const response = await addCashout(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function verifyCashoutBankAction(payload: AddCashoutBank) {
  const response = await verifyCashoutBank(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addCashoutBankAction(payload: AddCashoutBank) {
  const response = await addCashoutBank(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function cashoutLimitIncreaseAction(payload: ICashoutLimit) {
  const response = await cashoutLimitIncrease(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function cashoutWithdrawalAction(payload: ICashoutWithdraw) {
  const response = await cashoutWithdrawal(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function cashoutRequestConfirmationAction(payload: ICashoutOTP) {
  const response = await cashoutRequestConfirmation(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function approveCashoutAction(id: string) {
  const response = await approveCashout(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function rejectCashoutAction(id: string) {
  const response = await rejectCashout(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
