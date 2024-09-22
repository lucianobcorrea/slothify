import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  authUser: AuthUser | null; 
  setAuthUser: (user: AuthUser | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

interface AuthUser {
  username: string;
  avatar: File;
  banner: File;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
