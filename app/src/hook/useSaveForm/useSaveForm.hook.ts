import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/initialForm/steps/step.screen";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveForm } from "@/api/initialForm/saveForm.api";
import { getResponseError } from "@/api/error/error.api";

export function useSaveForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await saveForm(data);

      navigate("/home");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  };

  return onSubmit;
}
