import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_TOP_RANKING = "/user/top-ranking";

export async function getTopRanking() {
  const response = await axiosInstance.get(URL_TOP_RANKING);
  return response.data;
}
