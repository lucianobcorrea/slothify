import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_CHALLENGE = "/user/challenges";

export async function getChallenges() {
  const response = await axiosInstance.get(URL_CHALLENGE);
  return response.data;
}
