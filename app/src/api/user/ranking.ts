import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_RANKING = "/user/ranking?size=12&page=";

export async function getRanking(page: number) {
  const response = await axiosInstance.get(URL_RANKING + page);
  return response.data;
}
