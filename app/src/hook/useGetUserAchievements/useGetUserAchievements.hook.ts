import { useState } from "react";
import { getAchievements } from "@/api/user/achievements";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Achievement {
    id: number;
    name: string;
    description: string;
    image: string;
    userHas: boolean;
    total: number;
    required: number;
    percentage: number;
  }

export function useGetUserAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>();

  async function fetchUserAchievements() {
    try {
      const response = await getAchievements();
      setAchievements(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    achievements,
    fetchUserAchievements,
  };
}
