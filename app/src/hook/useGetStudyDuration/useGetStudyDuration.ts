import { useState } from "react";
import { getStudyDuration } from "@/api/studyDuration/getStudyDuration.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface StudyDuration {
  id: number;
  image: string;
  duration: string;
}

export function useGetStudyDuration() {
  const [studyDurations, setStudyDurations] = useState<StudyDuration[]>([]);

  async function fetchStudyDurations() {
    try {
      const response = await getStudyDuration();
      setStudyDurations(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    studyDurations,
    fetchStudyDurations,
  };
}
