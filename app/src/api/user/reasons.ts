import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_REASON = "/user/reasons";

export async function getReasons() {
  const response = await axiosInstance.get(URL_REASON);
  return response.data;
}
