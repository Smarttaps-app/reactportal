import { useQuery } from "@tanstack/react-query";
import { leaderboards } from "../reducers/GameActions";
export function useLeaderBoard() {
  const {
    isPending: loading,
    data: leaders,
    isError,
    error,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: leaderboards,
    refetchOnWindowFocus: false,
  });
  return { loading, leaders, isError, error };
}
