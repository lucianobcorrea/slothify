import { utilizeItem } from "@/api/item/useItem";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useState } from "react";
import { useUserDataContext } from "../useDataUserContext/useUserDataContext.hook";

export function useItem() {
  const [itemData, setItemData] = useState();
  const { refreshUserData } = useUserDataContext();

  async function fetchUseItem(itemId: number) {
    try {
      const response = await utilizeItem(itemId);
      if (response.duration && response.duration > 0) {
        const key = response.subtype;
        const expirationTime = Date.now() + response.duration * 60 * 1000;
        localStorage.setItem(key, expirationTime.toString());
      }
      refreshUserData();
      toast.success("Poção utilizada! :)");
      setItemData(response);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    fetchUseItem,
    itemData,
  };
}
