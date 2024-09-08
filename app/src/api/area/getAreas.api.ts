import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_AREAS = '/area/all';

export async function getAreas() {
  const response = await axiosInstance.get(URL_AREAS);
  return response.data;
}