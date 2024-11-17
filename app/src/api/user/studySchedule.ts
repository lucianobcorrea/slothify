import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_STUDY_SCHEDULE = "/user/study-schedule";

export async function getSchedule() {
  const response = await axiosInstance.get(URL_STUDY_SCHEDULE);
  return response.data;
}
