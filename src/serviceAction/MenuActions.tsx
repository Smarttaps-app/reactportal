import {
  addAdmin,
  addNotification,
  addRole,
  deleteAdmin,
  deleteNotification,
  deleteRole,
  getAdmins,
  getAnalytics,
  getNotifications,
  getRoles,
  getSubscriptions,
  renewSubscription,
} from "../services/MenuService";
import { INotification, IRole, IUser } from "../utils/type";

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
// action for admin
export async function getRolesAction() {
  const response = await getRoles();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}

export async function addRoleAction(payload: IRole) {
  const response = await addRole(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteRoleAction(id: number) {
  const response = await deleteRole(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
// action for admin
export async function getAdminsAction(role = "") {
  const response = await getAdmins(role);
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}

export async function addAdminAction(payload: IUser) {
  const response = await addAdmin(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteAdminAction(id: number) {
  const response = await deleteAdmin(id);
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
export async function getAllPayers() {
  const response = await getAdmins("player");
  if (response.status == 200) return response.data.data;
  throw new Error(response.data);
}
export async function getPlayerAction(id: string) {
  const response = await getAdmins(`player/${id}`);
  if (response.status == 200) return response.data.data;
  throw new Error(response.data);
}
export async function addRuleAction(payload: import("../utils/type").IRule) {
  const response = await addRole(payload as any);
  if (response.status == 200) return response.data;
  throw new Error(response.data);
}
export async function deleteRuleAction(id: number) {
  const response = await deleteRole(id);
  if (response.status == 200) return response.data;
  throw new Error(response.data);
}
