import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_USER_DATA = "/user/data";

export async function getUserData() {
  const response = await axiosInstance.get(URL_USER_DATA);
  return response.data;
}
