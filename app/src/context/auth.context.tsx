import { createContext, useState, useEffect, ReactNode } from "react";
import { user } from "@/api/auth/user.api";

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  loading: boolean;
}

interface AuthUser {
  username: string;
  avatar: string;
  banner: string;
  color: string;
  initialForm?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      user()
        .then((authUserData) => {
          setAuthUser(authUserData);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setAuthUser(null);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
