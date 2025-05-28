import {
  addNotification,
  deleteNotification,
  getAnalytics,
  getNotifications,
  getPlayer,
  getPlayers,
  getSubscriptions,
  renewSubscription,
} from "../services/MenuService";
import { INotification } from "../utils/type";

// action for dashboard
export async function getAnalyticsAction() {
  const response = await getAnalytics();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
// action for Subscriptions
export async function getAllSubscriptions() {
  const response = await getSubscriptions();
  if (response.status == 200) {
    console.log(response.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function renewSubscriptionAction(id: number) {
  const response = await renewSubscription(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for players
export async function getAllPayers() {
  const response = await getPlayers();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function getPlayerAction(id: string) {
  const response = await getPlayer(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}

export async function getAllNotifications(startDate = "", endDate = "") {
  console.log(startDate, endDate);
  const response = await getNotifications(startDate, endDate);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addNotificationAction(payload: INotification) {
  const response = await addNotification(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteNotificationAction(id: number) {
  const response = await deleteNotification(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
