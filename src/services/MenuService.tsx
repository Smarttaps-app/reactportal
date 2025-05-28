import { api } from "../utils/AxiosInstance";
import { IAddRequest, INotification } from "../utils/type";

export function getProfileService() {
  return api.get(`admin/profile`);
}
// service for dashboard
export const getAnalytics = () => api.get(`admin/dashboard`);

// service for Subscriptions
export const getSubscriptions = () => api.get(`admin/subcriptions`);
export const renewSubscription = async (id: number) =>
  await api.get(`admin/subcription/${id}/renew`);

// service for Players
export const getPlayers = () => api.get(`admin/players`);
export const getPlayer = async (id: string) =>
  await api.get(`admin/player/${id}`);

// service for Notification
export function getNotifications(
  startDate?: string | null,
  endDate?: string | null
) {
  console.log(startDate, endDate);
  const params: { [key: string]: string } = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  return api.get(`admin/notifications`, {
    params,
  });
}
export const addNotification = async (payload: INotification) =>
  await api.post(`admin/notifications/add`, payload);
export const deleteNotification = async (id: number) =>
  await api.delete(`admin/notifications/${id}/delete`);

// service for admins
export const getAdmins = () => api.get(`admin`);
export const addAdmin = async (payload: IAddRequest) =>
  await api.post(`admin/add`, payload);
export const deleteAdmin = async (id: number) =>
  await api.delete(`admin/${id}/delete`);
