import { axiosInstance } from "@/api/_base/axiosInstance";

const CREATE_CHALLENGE = "/challenge/create";

interface ChallengeData {
  name: string;
  xpReward: number;
  coinsReward: number;
  requiredExercises?: number | null;
  requiredMultipleChoiceExercises?: number | null;
  requiredSortingExercises?: number | null;
  requiredDragAndDropExercises?: number | null;
  requiredXp?: number | null;
}

export async function create(challengeData: ChallengeData) {
    return axiosInstance.post(CREATE_CHALLENGE, challengeData);
  }