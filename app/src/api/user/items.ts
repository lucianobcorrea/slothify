import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_ITEMS = "/user/items";

export async function getItems() {
  const response = await axiosInstance.get(URL_ITEMS);
  return response.data;
}
