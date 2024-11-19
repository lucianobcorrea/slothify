import { useState } from "react";
import { getItems } from "@/api/user/items";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
    value: number;
    duration: number | null;
    rarity: string;
    itemType: string;
    subtype: string;
  }
  
  interface Items {
    [key: string]: Item[];
  }

export function useGetUserItems() {
    const [items, setItems] = useState<Items | null>(null);

  async function fetchUserItems() {
    try {
      const response = await getItems();
      setItems(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    items,
    fetchUserItems,
  };
}
