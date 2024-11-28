import { axiosInstance } from "@/api/_base/axiosInstance";

const SORTING = "/user-answer/sorting/";

interface FinalResult {
  content: string | undefined;
  correctOrder: number | undefined;
}

export async function sorting(
  exerciseId: number | undefined,
  sortingList: FinalResult[],
  startDate: string,
  finalDate: string
) {
  const response = axiosInstance.post(SORTING + exerciseId, {
    sortingList,
    startDate,
    finalDate,
  });
  return response;
}
