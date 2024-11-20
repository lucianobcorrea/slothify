import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_ACHIEVEMENTS = "/user/achievements";

export async function getAchievements() {
  const response = await axiosInstance.get(URL_ACHIEVEMENTS);
  return response.data;
}
