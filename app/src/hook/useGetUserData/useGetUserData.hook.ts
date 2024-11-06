import { useState } from "react";
import { getUserData } from "@/api/user/data";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface UserData {
  percentageToNextLevel: number;
  maxLevel: boolean;
  actualXp: number;
  nextLevel: number | null;
  actualLevel: number;
  xpToNextLevel: number | null;
  levelColor: string;
}

export function useGetUserData() {
  const [userData, setUserData] = useState<UserData>();

  async function fetchUserData() {
    try {
      const response = await getUserData();
      setUserData(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    userData,
    fetchUserData,
  };
}
