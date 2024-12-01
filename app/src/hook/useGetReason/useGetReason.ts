import { useState } from "react";
import { getReason } from "@/api/reason/getReason.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Reason {
  id: number;
  image: string;
  title: string;
  slug: string;
}

export function useGetReason() {
  const [reasons, setReasons] = useState<Reason[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchReasons() {
    try {
      const response = await getReason();
      setReasons(response);
      setLoading(true);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    reasons,
    fetchReasons,
    loading,
  };
}
