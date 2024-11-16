import { buyItem } from "@/api/shop/buyItem";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useNavigate } from "react-router-dom";

export function useBuyItem(
  itemImage: string,
  itemName: string,
  itemDescription: string,
  itemSubtype: string
) {
  const navigate = useNavigate();

  async function fetchBuyItem(itemId: number) {
    try {
      await buyItem(itemId);
      navigate("/loja/comprar", {
        state: {
          image: itemImage,
          name: itemName,
          description: itemDescription,
          subtype: itemSubtype
        },
      });
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    fetchBuyItem,
  };
}
