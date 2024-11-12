import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_SHOP = '/shop/all';

export async function getShopItems() {
  const response = await axiosInstance.get(URL_SHOP);
  return response.data;
}