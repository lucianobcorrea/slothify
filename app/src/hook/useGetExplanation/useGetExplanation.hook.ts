import { useState } from "react";
import { getExplanation } from "@/api/explanation/getExplanation.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export interface Explanation {
  title: string;
  objective: string;
  example: string;
  tip: number;
  lesson_id: number;
  keyPoints: [];
}

export function useGetExplanation() {
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const navigate = useNavigate();

  async function fetchExplanation(
    id: number | undefined,
    exerciseType: string
  ) {
    if (id === undefined) {
      toast.error("Lição inválida!");
      return;
    }
    try {
      const response = await getExplanation(id);
      setExplanation(response);
      navigate("/explicacao", {
        state: {
          explanation: response,
        },
      });
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response &&
        error.response.status === 404
      ) {
        navigate("/exercicio", {
          state: {
            lessonId: id,
            exerciseType: exerciseType,
          },
        });
      } else {
        const message = getResponseError(error);
        toast.error(message);
      }
    }
  }

  return {
    explanation,
    fetchExplanation,
  };
}
