import { useQuery } from "@tanstack/react-query";
import { getAnalyticsAction } from "../../../reducers/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useAnalytics() {
  const { isPending, data, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticsAction,
    //retry: false,
  });
  if (error) toast.error(Common.formatError(error));
  return { isPending, data, error };
}
