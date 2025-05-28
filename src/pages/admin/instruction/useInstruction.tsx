import { useQuery } from "@tanstack/react-query";
import { getAllInstructions } from "../../../serviceAction/MenuActions";
import { toast } from "react-toastify";
import { Common } from "../../../utils/Common";

export function useInstructions() {
  const {
    isPending: isLoadingInstructions,
    data: instructions,
    error,
  } = useQuery({
    queryKey: ["instructions"],
    queryFn: getAllInstructions,
    retry: false,
  });
  if (error) toast.error(Common.formatError(error));
  return { isLoadingInstructions, instructions, error };
}
