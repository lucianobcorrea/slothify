import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_AREA = '/area/all';

export async function getArea() {
  const response = await axiosInstance.get(URL_AREA);
  return response.data;
}