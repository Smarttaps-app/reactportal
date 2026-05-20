import {
  addCashout,
  addCashoutBank,
  approveCashout,
  cashout,
  cashoutLimitIncrease,
  cashoutRequestConfirmation,
  cashoutWithdrawal,
  getBanks,
  getCashouts,
  getLastTenDaysPayments,
  getPayment,
  getPayments,
  getRevenues,
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
import dayjs from "dayjs";

// action for admin
export async function getBanksAction() {
  const response = await getBanks();
  if (response.status == 200) {
    return response.data.data;
  }
  throw new Error(response.data);
}

// action for payment
export async function getPaymentsAction(
  selectedDates: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
) {
  const response = await getPayments(
    selectedDates?.[0]?.format("YYYY-MM-DD"),
    selectedDates?.[1]?.format("YYYY-MM-DD"),
  );

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
export async function cashoutAction(id: number) {
  const response = await cashout(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
// action for payment
export async function getRevenuesAction(
  selectedDates: [dayjs.Dayjs, dayjs.Dayjs] | undefined,
) {
  const response = await getRevenues(
    selectedDates?.[0]?.format("YYYY-MM-DD"),
    selectedDates?.[1]?.format("YYYY-MM-DD"),
  );
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
