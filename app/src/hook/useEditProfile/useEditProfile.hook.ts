import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/profile/profile.screen";
import { toast } from "react-toastify";
import { edit } from "@/api/user/edit";
import { getResponseError } from "@/api/error/error.api";

export function useEditProfile() {
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await edit(data);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  };

  return onSubmit;
}
