import { useState } from "react";
import { getReasons } from "@/api/user/reasons";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Reason {
  id: number;
  image: string;
  title: string;
  slug: string;
}

export function useGetUserReasons() {
  const [reasons, setReasons] = useState<Reason[]>([]);

  async function fetchUserReasons() {
    try {
      const response = await getReasons();
      setReasons(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    reasons,
    fetchUserReasons,
  };
}
