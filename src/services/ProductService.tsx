import { api } from "../utils/AxiosInstance";
import { IBiller, IPackage, IProduct } from "../utils/type";

// service for product
export const getProducts = async () => await api.get(`admin/products`);
export const getProduct = async (id: string) =>
  await api.get(`admin/product/${id}`);
export const addProduct = async (payload: IProduct) =>
  await api.post(`admin/product/add`, payload);
export const deleteProduct = async (id: number) =>
  await api.delete(`admin/product/${id}/delete`);

// service for biller
export const getBillers = async () => await api.get(`admin/biller`);
export const getBiller = async (id: string) =>
  await api.get(`admin/biller/${id}`);
export const refreshProvider = async (payload: IBiller) =>
  await api.post(`admin/provider/refresh`, payload);
export const addBiller = async (payload: IBiller) =>
  await api.post(`admin/biller/add`, payload);
export const switchBiller = async (payload: IBiller) =>
  await api.post(`admin/biller/switch-provider`, payload);
export const deleteBiller = async (id: number) =>
  await api.delete(`admin/biller/${id}/delete`);

// service for package
export const getPackages = async () => await api.get(`admin/package`);
export const getPackage = async (id: string) =>
  await api.get(`admin/package/${id}`);
export const addPackage = async (payload: IPackage) =>
  await api.post(`admin/package/add`, payload);
export const fetchPackage = async ({
  product_type_id,
}: {
  product_type_id: string;
}) =>
  await api.post(`admin/package/add`, {
    product_type_id: product_type_id,
  });

export const deletePackage = async (id: number) =>
  await api.delete(`admin/package/${id}/delete`);

// services
export const getServices = async () => await api.get(`admin/services`);
export const getProviders = async () => await api.get(`admin/providers`);
