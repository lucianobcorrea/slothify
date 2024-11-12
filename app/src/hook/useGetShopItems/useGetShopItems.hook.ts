import { useState } from "react";
import { getShopItems } from "@/api/shop/getShopItems.api";
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

export function useGetShopItems() {
  const [items, setItems] = useState<Items | null>(null);

  async function fetchShopItems() {
    try {
      const response = await getShopItems();
      setItems(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    items,
    fetchShopItems,
  };
}
