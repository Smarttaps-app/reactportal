import { useQuery } from "@tanstack/react-query";
import { getAnalyticsAction } from "../../../serviceAction/MenuActions";
import { Common } from "../../../utils/Common";
import { message } from "antd";

export function useAnalytics() {
  const { isPending, data, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalyticsAction,
    //retry: false,
  });
  if (error) message.error(Common.formatError(error));
  return { isPending, data, error };
}
