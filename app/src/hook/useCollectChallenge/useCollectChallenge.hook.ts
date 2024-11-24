import { collect } from "@/api/challenge/collect";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useUserDataContext } from "../useDataUserContext/useUserDataContext.hook";
import { useState } from "react";

export function useCollectChallenge() {
  interface Reward {
    xpReward: number;
    coinsReward: number;
  }

  const { refreshUserData } = useUserDataContext();
  const [rewards, setRewards] = useState<Reward | null>(null);

  async function fetchCollectItem(challengeId: number, setChangeChallenges: (isChanged: boolean) => void): Promise<Reward | null> {
    try {
      const response = await collect(challengeId); 
      setRewards(response); 
      refreshUserData(); 
      setChangeChallenges(true);
      return response;
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message); 
      setChangeChallenges(false);
      return null; 
    }
  }

  function resetRewards() {
    setRewards(null); 
  }

  return {
    rewards,
    fetchCollectItem,
    resetRewards, 
  };
}
