import { useState } from "react";
import { getExercise } from "@/api/exercise/getExercise.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Exercise {
  id: number;
  statement: string;
  image: string;
}

export function useGetExercise(id: number) {
  const [exercise, setExercise] = useState<Exercise | null>(null);

  async function fetchExercise() {
    try {
      const response = await getExercise(id);
      setExercise(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    exercise,
    fetchExercise,
  };
}
