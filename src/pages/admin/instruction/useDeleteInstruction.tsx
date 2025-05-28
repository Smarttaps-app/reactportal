import { useMutation } from "@tanstack/react-query";
import { deleteInstructionAction } from "../../../serviceAction/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useDeleteInstruction() {
  const { mutate: deleteInstruction, isPending: isdeleting } = useMutation({
    mutationFn: deleteInstructionAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteInstruction };
}
