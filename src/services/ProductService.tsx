import { api } from "../utils/AxiosInstance";

// service for product
export const getProducts = async () => await api.get(`admin/products`);
export const getServices = async () => await api.get(`admin/services`);

export const getProduct = async (id: string) =>
  await api.get(`admin/product/${id}`);
