import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import api from "../api/api";
import getUserApi from "../api/userApi/getUserApi";

type User = {
  _id: string;
  name: string;
  email: string;
  // thêm field khác tùy backend (ví dụ: role, avatar, ...)
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Hàm lấy thông tin user bằng userId
  const fetchUser = async (userId: string) => {
    try {
      const res = await getUserApi(userId);
      // backend trả về { data: user }
      setUser(res.data?.data || res.data);
    } catch (err) {
      console.error("❌ Fetch user error:", err);
      setUser(null);
    }
  };

  // 🔹 Kiểm tra login khi mở web
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
