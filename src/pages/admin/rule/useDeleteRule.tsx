import { useMutation } from "@tanstack/react-query";
import { deleteRuleAction } from "../../../serviceAction/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useDeleteRule() {
  const { mutate: deleteRule, isPending: isdeleting } = useMutation({
    mutationFn: deleteRuleAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteRule };
}
