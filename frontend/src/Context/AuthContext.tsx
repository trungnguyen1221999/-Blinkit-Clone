import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import api from "../api/api";
import getUserApi from "../api/userApi/getUserApi";

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  // thêm field khác tùy backend
};

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  fetchUser: (userId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Lấy user từ localStorage
  const initUser = localStorage.getItem("user");
  console.log(initUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(
    initUser ? JSON.parse(initUser) : null
  );
  console.log(user);
  const [loading, setLoading] = useState(true);

  // Đồng bộ user vào localStorage khi thay đổi
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Hàm fetch user từ backend
  const fetchUser = async (userId: string) => {
    try {
      const res = await getUserApi(userId);
      const fetchedUser = res.data?.data || res.data;
      if (fetchedUser) setUser(fetchedUser);
    } catch (err) {
      console.error("❌ Fetch user error:", err);
      setUser(null);
    }
  };

  // Kiểm tra auth khi load trang
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/user/check-auth", {
          withCredentials: true,
        });

        if (res.data.success) {
          setIsAuthenticated(true);
          await fetchUser(res.data.userId);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Auth check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
