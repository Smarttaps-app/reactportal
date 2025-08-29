import {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { IUser } from "../utils/type";
import { api } from "../utils/AxiosInstance";
import { Common } from "../utils/Common";
import { getProfileService } from "../services/MenuService";

interface AuthContextType {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
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
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
