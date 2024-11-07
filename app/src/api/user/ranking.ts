import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_RANKING = "/ranking?size=12&page=";

export async function getRanking(page: number) {
  const response = await axiosInstance.get(URL_RANKING + page);
  return response.data;
}
