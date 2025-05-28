import { useQuery } from "@tanstack/react-query";
import { getAllPayers } from "../../../serviceAction/MenuActions";

export function usePlayers() {
  const { isPending, data, error } = useQuery({
    queryKey: ["players"],
    queryFn: getAllPayers,
    retry: false,
  });
  return { isPending, data, error };
}
