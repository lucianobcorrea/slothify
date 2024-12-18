import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/forgotPassword/sendEmail.screen";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmail } from "@/api/auth/sendEmail.api";
import { getResponseError } from "@/api/error/error.api";

export function useSendRecoverPasswordEmail() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await sendEmail(data.email);
      navigate("/login");
      toast.success("Please check your email!");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  };

  return onSubmit;
}
