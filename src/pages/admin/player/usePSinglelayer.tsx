import { useQuery } from "@tanstack/react-query";
import { getPlayerAction } from "../../../reducers/MenuActions";
import { useParams } from "react-router-dom";

export function useSinglePlayer() {
  const { id } = useParams();
  console.log(id);
  const {
    isPending,
    data: player,
    error,
  } = useQuery({
    queryKey: ["player", id],
    queryFn: () => getPlayerAction(id ?? ""),
    retry: false,
    enabled: !!id,
  });
  return { isPending, player, error };
}
