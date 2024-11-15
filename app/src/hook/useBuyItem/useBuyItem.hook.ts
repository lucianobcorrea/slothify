import { buyItem } from "@/api/shop/buyItem";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";
import { useNavigate } from "react-router-dom";

export function useBuyItem() {
  const navigate = useNavigate();

  async function fetchBuyItem(itemId: number) {
    try {
      await buyItem(itemId);
      navigate("/loja/comprar");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  }

  return {
    fetchBuyItem,
  };
}
