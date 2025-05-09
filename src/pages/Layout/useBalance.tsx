import { useQuery } from "@tanstack/react-query";
import { getBalanceAction } from "../../store/actions/MainActions";

export function useBalance() {
  const {
    isPending: loading,
    data: balance,
    error,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => await getBalanceAction(),
    //retry: false,
  });
  return { loading, balance, error };
}
