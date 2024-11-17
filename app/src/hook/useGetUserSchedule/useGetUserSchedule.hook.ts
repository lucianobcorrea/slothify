import { useState } from "react";
import { getSchedule } from "@/api/user/studySchedule";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Schedule {
  studyDuration: number;
  studyDays: StudyDays[];
}

interface StudyDays {
  weekDay: string;
}

export function useGetUserSchedule() {
  const [schedules, setSchedule] = useState<Schedule>();

  async function fetchUserSchedule() {
    try {
      const response = await getSchedule();
      setSchedule(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    schedules,
    fetchUserSchedule,
  };
}
