import { useMutation } from "@tanstack/react-query";
import { submitGameAction } from "../reducers/GameActions";
import { Common } from "../utils/Common";
import { message } from "antd";

export const useSubmitAnswer = () => {
  const { mutate: submitGame, isPending } = useMutation({
    mutationFn: submitGameAction,
    onError: (error) => {
      console.error(error);
      console.error(error.message);
      message.error(Common.formatError(error));
    },
  });
  return { submitGame, isPending };
};
