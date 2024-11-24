import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_COLLECT_CHALLENGE = "/challenge/collect/";

export async function collect(userDailyChallengeId: number) {
  const response = await axiosInstance.patch(
    URL_COLLECT_CHALLENGE + userDailyChallengeId
  );
  return response.data;
}
