import { api } from "../utils/AxiosInstance";

// service for Payments
export const getProducts = async () => await api.get(`admin/products`);

export const getProduct = async (id: string) =>
  await api.get(`admin/product/${id}`);
