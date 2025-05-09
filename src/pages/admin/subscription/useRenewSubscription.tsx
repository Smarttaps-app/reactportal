import { useMutation } from "@tanstack/react-query";
import { renewSubscriptionAction } from "../../../reducers/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useRenewSubscription() {
  const { mutate: renew, isPending: isRenewing } = useMutation({
    mutationFn: renewSubscriptionAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isRenewing, renew };
}
