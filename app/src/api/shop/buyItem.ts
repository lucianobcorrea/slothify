import { axiosInstance } from "@/api/_base/axiosInstance";

const BUY_SHOP = "/shop/buy/";

export async function buyItem(itemId: number) {
  await axiosInstance.post(BUY_SHOP + itemId);
}
