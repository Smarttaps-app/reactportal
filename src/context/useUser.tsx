import { useContext } from "react";
import UserContext from "./UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    return { user: null, loading: false, setUser: () => {}, logout: async () => {} };
  }
  return context;
};