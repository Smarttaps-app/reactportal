import { useMutation } from "@tanstack/react-query";
import { addGameAction } from "../../../serviceAction/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useAddGame() {
  const { mutate: addGame, isPending: isAdding } = useMutation({
    mutationFn: addGameAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isAdding, addGame };
}
