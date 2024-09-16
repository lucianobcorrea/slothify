import { useState } from "react";
import { getArea } from "@/api/area/getArea.api";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Area {
  id: number;
  image: string;
  description: string;
  title: string;
  slug: string;
}

export function useGetArea() {
  const [areas, setAreas] = useState<Area[]>([]);

  async function fetchAreas() {
    try {
      const response = await getArea();
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
