import { axiosInstance } from "@/api/_base/axiosInstance";

const UPDATE_CHALLENGE = "admin/challenge/update/";

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

export async function update(challengeData: ChallengeData, id: number) {
  return axiosInstance.patch(UPDATE_CHALLENGE + id, challengeData);
}
