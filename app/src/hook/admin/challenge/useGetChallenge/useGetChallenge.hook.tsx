import { useState } from "react";
import { edit } from "@/api/admin/challenge/edit.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

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

export function useGetChallenge() {
  const [challenge, setChallenge] = useState<Challenge>();
  const [loadingChallenge, setLoadingChallenge] = useState<boolean>(false);

  async function fetchChallenge(id : number) {
    try {
      const response = await edit(id);
      setChallenge(response);
      setLoadingChallenge(true);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    } finally {
      setLoadingChallenge(false);
    }
  }

  return {
    challenge,
    fetchChallenge,
    loadingChallenge,
  };
}
