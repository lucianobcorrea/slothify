import { axiosInstance } from "@/api/_base/axiosInstance";

const USE_ITEM = "/item/use/";

export async function utilizeItem(itemId: number) {
  const response = await axiosInstance.post(USE_ITEM + itemId);
  return response.data;
}
