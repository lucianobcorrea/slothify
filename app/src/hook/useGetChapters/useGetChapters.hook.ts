import { useState } from "react";
import { getChapters } from "@/api/chapter/getAllByArea";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useUserDataContext } from "../useDataUserContext/useUserDataContext.hook";

interface ExerciseCategory {
  name: string;
  image: string;
}

interface Lesson {
  id: number;
  exerciseType: string;
  title: string;
  canBeDone: boolean;
  exerciseCategory: ExerciseCategory;
}

interface Chapter {
  title: string;
  color: string;
  lessons: Lesson[];
}

type ChaptersResponse = Chapter[];

export function useGetChapters(areaId: number) {
  const { refreshUserData } = useUserDataContext();
  const [chapters, setChapters] = useState<ChaptersResponse>([]);

  async function fetchChapters() {
    try {
      const response = await getChapters(areaId);
      setChapters(response);
      refreshUserData();
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    chapters,
    fetchChapters,
  };
}
