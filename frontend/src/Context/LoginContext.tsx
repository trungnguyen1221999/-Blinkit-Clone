import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";

// Định nghĩa kiểu dữ liệu user
export interface UserInterface {
  name: string;
  email: string;
  avatar?: string;
  role?: "ADMIN" | "USER";
}

// Kiểu dữ liệu cho context
interface LoginContextType {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
}

export const LoginContext = createContext<LoginContextType | null>(null);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};
