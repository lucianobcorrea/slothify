import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_EXERCISE = 'exercise/get/';

export async function getExercise(exerciseId : number) {
  const response = await axiosInstance.get(URL_EXERCISE + exerciseId);
  return response.data;
}