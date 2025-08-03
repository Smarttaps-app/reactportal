import { useQuery } from "@tanstack/react-query";
import {
  getProductsAction,
  getServicesAction,
} from "../serviceAction/ProductActions";
export function useProducts() {
  const {
    isPending: loading,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
    refetchOnWindowFocus: false,
  });
  return { loading, products, error };
}
export function useProductServices() {
  const {
    isPending: loading,
    data: services = [],
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServicesAction,
    refetchOnWindowFocus: false,
  });
  return { loading, services, error };
}
