import { axiosInstance } from "@/api/_base/axiosInstance";

const FORM = "/welcome";

interface FormData {
  areas: string[];
  reasons: string[];
  studyDay: string;
  studyDuration: string;
}

export async function saveForm({
  areas,
  reasons,
  studyDay,
  studyDuration,
}: FormData) {
  await axiosInstance.post(FORM, {
    areas,
    reasons,
    studyDay,
    studyDuration,
  });
}
