import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { loginAction } from "../../serviceAction/AuthActions";
import { Common } from "../../utils/Common";
import { getProfileService } from "../../services/MenuService";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginAction,
    onSuccess: async () => {
      const response = await getProfileService();
      if (response.status == 200) {
        console.log(response.data.data);
        message.success("Login successful!");
        console.log(response.data.data.tag);
        if (response.data.data.tag === "superadmin") {
          navigate("/admin", { replace: true });
        } else if (response.data.data.tag === "support") {
          navigate("/support", { replace: true });
        } else if (response.data.data.tag === "business") {
          navigate("/business", { replace: true });
        } else {
          navigate("auth/login", { replace: true });
        }
      }
    },
    onError: (error) => {
      console.error(error);
      console.error(error.message);
      message.error(Common.formatError(error));
    },
  });
  return { login, isPending };
};
export const useChangePassword = () => {
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: loginAction,
  });
  return { changePassword, isPending };
};
