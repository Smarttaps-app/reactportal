import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../serviceAction/ProductActions";
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
