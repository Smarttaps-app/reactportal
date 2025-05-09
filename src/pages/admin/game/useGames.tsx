import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "../../../reducers/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useGames() {
  const { isPending, data, error } = useQuery({
    queryKey: ["games"],
    queryFn: getAllGames,
    retry: false,
  });
  if (error) toast.error(Common.formatError(error));
  return { isPending, data, error };
}
