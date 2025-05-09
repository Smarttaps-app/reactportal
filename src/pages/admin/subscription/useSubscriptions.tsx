import { useQuery } from "@tanstack/react-query";
import { getAllSubscriptions } from "../../../reducers/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useSubscriptions() {
  const { isPending, data, error } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getAllSubscriptions,
    retry: false,
  });
  if (error) toast.error(Common.formatError(error));
  return { isPending, data, error };
}
