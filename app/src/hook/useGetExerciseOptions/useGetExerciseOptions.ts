import { useState } from "react";
import { getExerciseOptions } from "@/api/exercise/getExerciseOptions.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

export interface ExerciseOptions {
  id: number;
  content: string;
  correct: boolean;
  correctOrder: number;
  category: string;
}

export function useGetExerciseOptions(id: number | undefined) {
  const [options, setOptions] = useState<ExerciseOptions[] | null>(null);

  async function fetchExerciseOptions() {
    if (id === undefined) {
      toast.error("Exercício inválido!");
      return;
    }
    try {
      const response = await getExerciseOptions(id);
      setOptions(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    options,
    fetchExerciseOptions,
  };
}
