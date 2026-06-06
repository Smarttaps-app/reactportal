import { useMutation, useQuery } from "@tanstack/react-query";
import { Common } from "../utils/Common";
import { message } from "antd";
import {
  addRoleAction,
  deleteRoleAction,
  getRolesAction,
} from "../serviceAction/MenuActions";

export function useRoles() {
  const {
    isPending: isShowing,
    data: roles,
    error,
  } = useQuery({
    queryKey: ["roles"],
    queryFn: getRolesAction,
    retry: false,
  });
  if (error) message.error(Common.formatError(error));
  return { isShowing, roles, error };
}
export function useAddRole() {
  const { mutate: addRole, isPending: isAdding } = useMutation({
    mutationFn: addRoleAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isAdding, addRole };
}
export function useDeleteRole() {
  const { mutate: deleteRole, isPending: isdeleting } = useMutation({
    mutationFn: deleteRoleAction,
    onError: (error) => {
      console.log(error);
      message.error(Common.formatError(error));
    },
  });
  return { isdeleting, deleteRole };
}
export function useRules() {
  const {
    isPending: isLoadingRules,
    data: rules,
    error,
  } = useQuery({
    queryKey: ["rules"],
    queryFn: getRolesAction,
    retry: false,
  });
  if (error) message.error(Common.formatError(error));
  return { isLoadingRules, rules, error };
}
