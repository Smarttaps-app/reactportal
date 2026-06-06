import { getLeaders, getSubscription, submitPlay } from "../services/GameService";
import { ISubmitGameRequest } from "../utils/type";

export async function leaderboards() {
  const response = await getLeaders();
  if (response.status === 200) return response.data.data;
  throw new Error(response.data);
}

export async function playGame() {
  const response = await getSubscription();
  if (response.status === 200) return response.data.data;
  throw new Error(response.data);
}

export async function submitGameAction(payload: ISubmitGameRequest) {
  const response = await submitPlay(payload);
  if (response.status === 200) return response.data;
  throw new Error(response.data);
}
