import { useQuery, useMutation } from "@tanstack/react-query";
import {
  addAdminAction,
  deleteAdminAction,
  getAdminsAction,
} from "../serviceAction/MenuActions";
import { Common } from "../utils/Common";
import { App } from "antd";

export function useAdmins(role: string) {
  const { notification } = App.useApp();
  const {
    isPending,
    data = [],
    error,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdminsAction(role),
    retry: false,
  });
  if (error)
    notification.error({
      message: "Admin",
      description: Common.formatError(error),
    });
  return { isPending, data, error };
}
export function useAddAdmin() {
  const { notification } = App.useApp();
  const { mutate: addAdmin, isPending: isAdding } = useMutation({
    mutationFn: addAdminAction,
    onSuccess: (response) => {
      notification.success({
        message: "Admin",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Admin",
        description: Common.formatError(error),
      });
    },
  });
  return { isAdding, addAdmin };
}
export function useDeleteAdmin() {
  const { notification } = App.useApp();
  const { mutate: deleteAdmin, isPending: isdeleting } = useMutation({
    mutationFn: deleteAdminAction,
    onSuccess: (response) => {
      notification.success({
        message: "Admin",
        description: response.statusDescription,
      });
    },
    onError: (error) => {
      notification.error({
        message: "Admin",
        description: Common.formatError(error),
      });
    },
  });
  return { isdeleting, deleteAdmin };
}
