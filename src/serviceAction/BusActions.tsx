import {
  getBusTypes,
  addBusType,
  deleteBusType,
  getBusType,
  getBusProviders,
  getRoutesViaAdmin,
  getBusesViaAdmin,
} from "../services/BusService";
import { IBusType } from "../utils/type";
// action for Bus Types
export async function getBusProvidersAction() {
  const response = await getBusProviders();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getBusTypesAction() {
  const response = await getBusTypes();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getBusTypeAction(id: string) {
  const response = await getBusType(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function addBusTypeAction(payload: IBusType) {
  const response = await addBusType(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteBusTypeAction(id: number) {
  const response = await deleteBusType(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function getBusesViaAdminAction(id: number) {
  const response = await getBusesViaAdmin(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getRouteViaAdminAction(id: number) {
  const response = await getRoutesViaAdmin(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
