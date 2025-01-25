import { FormFields } from "@/ui/admin/screen/challenge/edit.screen";
import { SubmitHandler } from "react-hook-form";
import { getResponseError } from "@/api/error/error.api";
import { toast } from "react-toastify";
import { update } from "@/api/admin/challenge/update.api";
import { useNavigate } from "react-router-dom";

export function useUpdateChallenge(challengeType: string, id: number) {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const filteredValues = {
        ["name"]: data["name"],
        ["coinsReward"]: data["coinsReward"],
        ["xpReward"]: data["xpReward"],
      };

      const challengeData = {
        ...filteredValues,
        [challengeType]: data[challengeType as keyof FormFields],
      };

      await update(challengeData, id);

      toast.success("Challenge updated!");
      navigate("/admin/challenges/edit/" + id);
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  };

  return onSubmit;
}
