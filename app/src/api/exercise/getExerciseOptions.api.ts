import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_EXERCISE_OPTIONS = 'exercise-option/list/';

export async function getExerciseOptions(exerciseId : number) {
  const response = await axiosInstance.get(URL_EXERCISE_OPTIONS + exerciseId);
  return response.data;
}