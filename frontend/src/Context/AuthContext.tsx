// AuthContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import api from "../api/api";
import getUserApi from "../api/userApi/getUserApi";
import logoutApi from "../api/userApi/logoutApi";
import { useNavigate } from "react-router-dom";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: "USER " | "ADMIN";
  status: "Active" | "Inactive" | "Suspended";
  verify_email: boolean;
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
  fetchUser: (userId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  // lazy init để tránh gọi localStorage trên server hoặc parse sai
  const initUser = (): User | null => {
    try {
      if (typeof window === "undefined") return null;
      const s = localStorage.getItem("user");
      if (!s) return null;
      // tránh parse "null" / "undefined" string
      if (s === "null" || s === "undefined") return null;
      return JSON.parse(s) as User;
    } catch (err) {
      console.error("AuthProvider: failed parsing localStorage user:", err);
      return null;
    }
  };

  const [user, setUserState] = useState<User | null>(initUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initUser);
  const [loading, setLoading] = useState<boolean>(!!initUser); // nếu có init user, ta có thể set false sau check

  // wrapper setUser để luôn đồng bộ localStorage
  const setUser = (u: User | null) => {
    setUserState(u);
    try {
      if (typeof window !== "undefined") {
        if (u) localStorage.setItem("user", JSON.stringify(u));
        else localStorage.removeItem("user");
      }
    } catch (err) {
      console.error("AuthProvider: setUser localStorage error", err);
    }
  };

  // fetch user từ backend nếu cần (chỉ dùng khi bạn muốn cập nhật từ server)
  const fetchUser = async (userId: string) => {
    try {
      const res = await getUserApi(userId);
      const fetchedUser = res?.data; // chỉ lấy data chứa _id, name, email, avatar
      console.log(fetchUser);
      if (fetchedUser) setUser(fetchedUser);
    } catch (err) {
      await logoutApi(); // logout nếu fetch user fail (token invalid...)
      console.error("fetchUser error:", err);
    }
  };

  // Kiểm tra auth (optional - không force redirect)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/check-auth", {
          withCredentials: true,
        });
        const ok = !!res?.data?.success;
        setIsAuthenticated(ok);
        // Nếu bạn muốn: khi ok === true có thể fetchUser(res.data.userId)
        if (ok && res.data.userId) {
          // optional: keep in sync with server
          await fetchUser(res.data.userId);
        }
      } catch (err) {
        console.warn("checkAuth failed (allows anonymous access):", err);
        // Không redirect - cho phép truy cập anonymous
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // Chỉ check auth nếu có user trong localStorage
    if (user) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
