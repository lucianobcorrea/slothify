import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_CHAPTERS = "/chapter/list/";

export async function getChapters(areaId: number) {
  const response = await axiosInstance.get(URL_CHAPTERS + areaId);
  return response.data;
}
