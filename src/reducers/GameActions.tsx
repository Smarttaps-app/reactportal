import {
  getLeaders,
  getSubscription,
  submitPlay,
} from "../services/GameService";
import { ISubmitGameRequest, ILead } from "../utils/type";

export async function leaderboards() {
  const response = await getLeaders();
  if (response.status == 200) {
    console.log(response);
    return response.data.data as ILead[];
  }
  throw new Error(response.data);
}
export async function playGame() {
  const response = await getSubscription();
  if (response.status == 200) {
    console.log(response);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function submitGameAction(payload: ISubmitGameRequest) {
  const response = await submitPlay(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
