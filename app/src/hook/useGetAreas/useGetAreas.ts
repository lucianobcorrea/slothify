import { useState } from "react";
import { getAreas } from "@/api/area/getAreas.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Area {
  id: number;
  image: string;
  description: string;
  title: string;
  slug: string;
}

export function useGetAreas() {
  const [areas, setAreas] = useState<Area[]>([]);

  async function fetchAreas() {
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
    fetchAreas,
  };
}
