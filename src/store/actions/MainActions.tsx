import { api } from "../../utils/AxiosInstance";

export async function getBalanceAction() {
  const response = await api.get("admin/wallet/balance");
  if (response.status === 200) return response.data.data;
  throw new Error(response.data);
}
