import { useQuery } from "@tanstack/react-query";
import { getAllRules } from "../../../reducers/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useRules() {
  const {
    isPending: isLoadingRules,
    data: rules,
    error,
  } = useQuery({
    queryKey: ["rules"],
    queryFn: getAllRules,
    retry: false,
  });
  if (error) toast.error(Common.formatError(error));
  return { isLoadingRules, rules, error };
}
