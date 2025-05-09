import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useLogin } from "../hooks/useLogin";
import { ILogin, IUser } from "../utils/type";
import { api } from "../utils/AxiosInstance";
import { Common } from "../utils/Common";
import { getProfileService } from "../services/MenuService";

interface AuthContextType {
  user: IUser | null;
  login: (credentials: ILogin) => Promise<void>;
  loading: boolean;
  isloading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { login: loginMutate, isPending: isloading } = useLogin();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getProfileService();
        if (response.status == 200) {
          console.log(response.data.data);
          setUser(response.data.data);
        }
        if (response.status == 401) {
          setUser(null);
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
        message.error(Common.formatError(error));
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (credentials: ILogin) => {
    console.log(credentials);
    loginMutate(credentials, {
      onSuccess: () => {
        getProfileService()
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data);
              console.log(res.data.data);
              setUser(res.data.data);
              message.success("Login successful!");
              console.log(res.data.data.tag);
              if (res.data.data.tag === "superadmin") {
                navigate("/admin", { replace: true });
              } else if (res.data.data.tag === "support") {
                navigate("/support", { replace: true });
              } else if (res.data.data.tag === "business") {
                navigate("/business", { replace: true });
              } else {
                navigate("auth/login", { replace: true });
              }
            }
          })
          .catch((error) => {
            setUser(null);
            navigate("auth/login");
            console.error("Error fetching user profile:", error);
            message.error("Failed to fetch user profile.");
          });
      },
      onError: (error) => {
        setUser(null);
        message.error(
          Common.formatError(error) || "Login failed. Please try again."
        );
      },
    });
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("admin/logout", {});
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <UserContext.Provider value={{ user, loading, login, isloading, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
