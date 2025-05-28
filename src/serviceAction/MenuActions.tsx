import {
  addGame,
  addInstruction,
  addRule,
  deleteGame,
  deleteInstruction,
  deleteRule,
  getAnalytics,
  getGames,
  getInstructions,
  getPlayer,
  getPlayers,
  getRules,
  getSubscriptions,
  renewSubscription,
} from "../services/MenuService";
import { IGame, IInstruction, IRule } from "../utils/type";

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
// action for games
export async function getAllGames() {
  const response = await getGames();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addGameAction(payload: IGame) {
  const response = await addGame(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteGameAction(id: number) {
  const response = await deleteGame(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}

// action for rules
export async function getAllRules() {
  const response = await getRules();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addRuleAction(payload: IRule) {
  const response = await addRule(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteRuleAction(id: number) {
  const response = await deleteRule(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}

// action for Instructions
export async function getAllInstructions() {
  const response = await getInstructions();
  if (response.status == 200) {
    console.log(response.data.data);
    return response.data.data;
  }
  throw new Error(response.data);
}
export async function addInstructionAction(payload: IInstruction) {
  const response = await addInstruction(payload);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
export async function deleteInstructionAction(id: number) {
  const response = await deleteInstruction(id);
  if (response.status == 200) {
    console.log(response.data);
    return response.data;
  }
  throw new Error(response.data);
}
