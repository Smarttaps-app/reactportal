import { api } from "../utils/AxiosInstance";
import { IAddRequest, IGame, IInstruction, IRule } from "../utils/type";

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

// service for games
export const getGames = () => api.get(`admin/games`);
export const addGame = async (payload: IGame) =>
  await api.post(`admin/game/add`, payload);
export const deleteGame = async (id: number) =>
  await api.delete(`admin/game/${id}/delete`);

// service for Rules
export const getRules = () => api.get(`admin/rules`);
export const addRule = async (payload: IRule) =>
  await api.post(`admin/rule/add`, payload);
export const deleteRule = async (id: number) =>
  await api.delete(`admin/rule/${id}/delete`);

// service for Instruction
export const getInstructions = () => api.get(`admin/instructions`);
export const addInstruction = async (payload: IInstruction) =>
  await api.post(`admin/instruction/add`, payload);
export const deleteInstruction = async (id: number) =>
  await api.delete(`admin/instruction/${id}/delete`);

// service for admins
export const getAdmins = () => api.get(`admin`);
export const addAdmin = async (payload: IAddRequest) =>
  await api.post(`admin/add`, payload);
export const deleteAdmin = async (id: number) =>
  await api.delete(`admin/${id}/delete`);
