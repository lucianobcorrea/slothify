import { axiosInstance } from '@/api/_base/axiosInstance';

const URL_STUDY_DURATION = '/study-duration/all';

export async function getStudyDuration() {
  const response = await axiosInstance.get(URL_STUDY_DURATION);
  return response.data;
}