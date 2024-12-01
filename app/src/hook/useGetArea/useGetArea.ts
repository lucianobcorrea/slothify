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
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchAreas() {
    try {
      const response = await getArea();
      setLoading(true);
      setAreas(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    areas,
    fetchAreas,
    loading,
  };
}
