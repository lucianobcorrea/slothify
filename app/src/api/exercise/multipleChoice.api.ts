import { axiosInstance } from "@/api/_base/axiosInstance";

const MULTIPLE_CHOICE = "/user-answer/multiple-choice/";

export async function multipleChoice(
  exerciseId: number | undefined,
  answer: string
) {
  const response = axiosInstance.post(MULTIPLE_CHOICE + exerciseId, {
    answer,
  });
  return response;
}
