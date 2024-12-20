import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/forgotPassword/changePassword.screen";
import { resetPassword } from "@/api/auth/resetPassword.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getResponseError } from "@/api/error/error.api";

export function useResetPassword(userId: number, token: string) {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await resetPassword({ ...data, userId, token });
      toast.success(
        "Sua senha foi alterada com sucesso!"
      );
      navigate("/login");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
      navigate("/login");
    }
  };

  return onSubmit;
}
