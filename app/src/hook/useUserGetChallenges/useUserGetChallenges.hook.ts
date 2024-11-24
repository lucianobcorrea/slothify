import { useState } from "react";
import { getChallenges } from "@/api/user/challenges";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Challenge {
  id: number;
  name: string;
  collected: boolean;
  completed: boolean;
  xpReward: number;
  coinsReward: number;
  total: number;
  required: number;
  percentage: number;
}

export function useUserGetChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  async function fetchUserChallenges() {
    try {
      const response = await getChallenges();
      setChallenges(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    challenges,
    fetchUserChallenges,
  };
}
