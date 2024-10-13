import { useState } from "react";
import { getAreas } from "@/api/user/areas";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Area {
  id: number;
  image: string;
  description: string;
  title: string;
  slug: string;
}

export function useGetUserAreas() {
  const [areas, setAreas] = useState<Area[]>([]);

  async function fetchUserAreas() {
    try {
      const response = await getAreas();
      setAreas(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    areas,
    fetchUserAreas,
  };
}
