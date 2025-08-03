import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addAdminAction,
  deleteAdminAction,
  getAdminsAction,
} from "../serviceAction/MenuActions";
import { Common } from "../utils/Common";
import { message } from "antd";

export function useAdmins() {
  const {
    isPending,
    data = [],
    error,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdminsAction,
    retry: false,
  });
  if (error) message.error(Common.formatError(error));
  return { isPending, data, error };
}
export function useAddAdmin() {
  const { mutate: addAdmin, isPending: isAdding } = useMutation({
    mutationFn: addAdminAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addAdmin };
}
export function useDeleteAdmin() {
  const { mutate: deleteAdmin, isPending: isdeleting } = useMutation({
    mutationFn: deleteAdminAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteAdmin };
}
