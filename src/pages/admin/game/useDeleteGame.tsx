import { useMutation } from "@tanstack/react-query";
import { deleteGameAction } from "../../../serviceAction/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useDeleteGame() {
  const { mutate: deleteGame, isPending: isdeleting } = useMutation({
    mutationFn: deleteGameAction,
    onError: (error) => {
      console.log(error);
      toast.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteGame };
}
