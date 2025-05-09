import { api } from "../utils/AxiosInstance";
import { ISubmitGameRequest } from "../utils/type";

export const getLeaders = async () => await api.get(`play/online/leaderboard`);

export const getSubscription = async () =>
  await api.get(`play/online/subscription`);

export const submitPlay = async (payload: ISubmitGameRequest) =>
  await api.post(`play/online/submit`, payload);
