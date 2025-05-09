import { useQuery } from "@tanstack/react-query";
import { playGame } from "../reducers/GameActions";

export function useSubscription() {
  const {
    isPending: loading,
    data: game,
    isError,
    error: gameError,
  } = useQuery({
    queryKey: ["playing"],
    queryFn: playGame,
    refetchOnWindowFocus: false,
  });
  return { loading, game, isError, gameError };
}
