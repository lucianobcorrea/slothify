import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_EXPLANATION = 'explanation/get/';

export async function getExplanation(lessonId : number) {
  const response = await axiosInstance.get(URL_EXPLANATION + lessonId);
  return response.data;
}