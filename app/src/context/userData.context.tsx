import { useGetUserData } from "@/hook/useGetUserData/useGetUserData.hook";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface UserData {
  percentageToNextLevel: number;
  maxLevel: boolean;
  actualXp: number;
  nextLevel: number | null;
  actualLevel: number;
  xpToNextLevel: number | null;
  levelColor: string;
}

export const UserDataContext = createContext<UserData | undefined>(undefined);

interface UserDataProps {
  children: ReactNode;
}

export const UserDataProvider = ({ children }: UserDataProps) => {
  const { userData, fetchUserData } = useGetUserData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      await fetchUserData();
        setLoading(false);
    }
    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
      </div>
    );
  }

  return (
    <UserDataContext.Provider value={userData}>
        {children}
    </UserDataContext.Provider>
  );
};
