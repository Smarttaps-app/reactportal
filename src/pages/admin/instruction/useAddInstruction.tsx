import { useMutation } from "@tanstack/react-query";
import { addInstructionAction } from "../../../reducers/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useAddInstruction() {
  const { mutate: addInstruction, isPending: isAdding } = useMutation({
    mutationFn: addInstructionAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isAdding, addInstruction };
}
