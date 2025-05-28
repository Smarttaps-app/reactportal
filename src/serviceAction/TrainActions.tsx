import {
  getPayment,
  getPayments,
  getRoutes,
  getRoute,
  getStations,
  getStation,
  getParks,
} from "../services/TrainService";
// action for Park
export async function getParksAction() {
  const response = await getParks();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
// action for Routes
export async function getRoutesAction() {
  const response = await getRoutes();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getRouteAction(id: string) {
  const response = await getRoute(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for Station
export async function getStationsAction() {
  const response = await getStations();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getStationAction(id: string) {
  const response = await getStation(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
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
export async function getPaymentAction(id: string) {
  const response = await getPayment(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
