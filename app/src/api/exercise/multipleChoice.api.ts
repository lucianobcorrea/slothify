import { axiosInstance } from "@/api/_base/axiosInstance";

const MULTIPLE_CHOICE = "/user-answer/multiple-choice/";

export async function multipleChoice(
  exerciseId: number | undefined,
  answer: string,
  startDate: string,
  finalDate: string
) {
  const response = axiosInstance.post(MULTIPLE_CHOICE + exerciseId, {
    answer,
    startDate,
    finalDate,
  });
  return response;
}
