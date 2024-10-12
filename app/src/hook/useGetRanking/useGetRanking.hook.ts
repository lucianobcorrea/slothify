import { useState } from "react";
import { getRanking } from "@/api/user/ranking";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  banner: string;
  color: string;
  rankingPoint: number;
  initialForm: boolean;
}

export function useGetRanking(initialPage: number) {
  const [ranking, setRanking] = useState<User[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function fetchRanking() {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await getRanking(page);
      if (response.content.length === 0) {
        setHasMore(false);
      } else {
        setRanking((prevRanking) => {
          const newUsers = response.content.filter(
            (newUser: User) =>
              !prevRanking.some((user) => user.id === newUser.id)
          );
          return [...prevRanking, ...newUsers];
        });
        setPage(page + 1);
      }
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    ranking,
    fetchRanking,
    hasMore,
    isLoading,
  };
}
