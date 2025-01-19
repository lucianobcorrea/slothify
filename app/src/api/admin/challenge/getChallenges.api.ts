import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_CHALLENGES = "/admin/challenge";

export async function getChallenges() {
  const response = await axiosInstance.get(URL_CHALLENGES);
  return response.data;
}
