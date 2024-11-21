import { useState } from "react";
import { getTopRanking } from "@/api/user/topRanking";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Ranking {
    timesInFirstPlace: number;
    timesInSecondPlace: number;
    timesInThirdPlace: number;
}

export function useGetUserTopRanking() {
  const [ranking, setRanking] = useState<Ranking>();

  async function fetchUserRanking() {
    try {
      const response = await getTopRanking();
      setRanking(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    ranking,
    fetchUserRanking,
  };
}
