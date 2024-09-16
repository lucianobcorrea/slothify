import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_REASONS = '/reason/all';

export async function getReason() {
  const response = await axiosInstance.get(URL_REASONS);
  return response.data;
}