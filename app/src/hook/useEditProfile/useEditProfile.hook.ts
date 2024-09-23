import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/profile/profile.screen";
import { toast } from "react-toastify";
import { edit } from "@/api/user/edit";
import { getResponseError } from "@/api/error/error.api";
import { useAuthContext } from "../useAuthContext/useAuthContext.hook";

export function useEditProfile(setOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  const {setAuthUser} = useAuthContext();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const user = await edit(data);
      setAuthUser(user);
      setOpen(false);
      toast.success("Perfil editado! Agora você está pronto para a jornada.");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
      setOpen(true);
    }
  };

  return onSubmit;
}
