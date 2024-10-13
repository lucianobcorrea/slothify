import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_AREA = "/user/areas";

export async function getAreas() {
  const response = await axiosInstance.get(URL_AREA);
  return response.data;
}
