import { useMutation } from "@tanstack/react-query";
import { addRuleAction } from "../../../serviceAction/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useAddRule() {
  const { mutate: addRule, isPending: isAdding } = useMutation({
    mutationFn: addRuleAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isAdding, addRule };
}
