import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/profile/profile.screen";
import { toast } from "react-toastify";
import { edit } from "@/api/user/edit";
import { getResponseError } from "@/api/error/error.api";

export function useEditProfile(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await edit(data);
      setOpen(false);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
      setOpen(true);
    }
  };

  return onSubmit;
}
