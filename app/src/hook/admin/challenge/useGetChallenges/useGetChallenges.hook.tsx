import { useState } from "react";
import { getChallenges } from "@/api/admin/challenge/getChallenges.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useUserDataContext } from "../../../useDataUserContext/useUserDataContext.hook";

interface Challenge {
  id: number;
  name: string;
  xpReward: number;
  coinsReward: number;
  requiredExercises?: number | null;
  requiredMultipleChoiceExercises?: number | null;
  requiredSortingExercises?: number | null;
  requiredDragAndDropExercises?: number | null;
  requiredXp?: number | null;
}

type ChallengesResponse = Challenge[];

export function useGetChallenges() {
  const { refreshUserData } = useUserDataContext();
  const [challenges, setChallenges] = useState<ChallengesResponse>([]);
  const [loadingChallenges, setLoadingChallenges] = useState<boolean>(false);

  async function fetchChallenges() {
    try {
      const response = await getChallenges();
      setChallenges(response);
      setLoadingChallenges(true);
      refreshUserData();
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    } finally {
      setLoadingChallenges(false);
    }
  }

  return {
    challenges,
    fetchChallenges,
    loadingChallenges,
  };
}
