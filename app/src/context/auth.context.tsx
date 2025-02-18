import { createContext, useState, useEffect, ReactNode } from "react";
import { user } from "@/api/auth/user.api";
import { getResponseError } from "@/api/error/error.api";
import { toast } from "react-toastify";
import defaultAvatar from "@/assets/image/profile/default.png";
import defaultBanner from "@/assets/image/profile/defaultBanner.png";

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
  email: string;
  rankingPoint: number;
  initialForm?: boolean;
  role: string;
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
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await user();
          const authUserData = response;

          if (!authUserData.avatar) {
            authUserData.avatar = defaultAvatar;
          }

          if (!authUserData.banner) {
            authUserData.banner = defaultBanner;
          }

          setAuthUser(authUserData);
          setIsLoggedIn(true);
        } catch (error) {
          const message = getResponseError(error);
          toast.error(message); 
          localStorage.removeItem("token");
          setAuthUser(null);
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
  
    fetchUserData();
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
