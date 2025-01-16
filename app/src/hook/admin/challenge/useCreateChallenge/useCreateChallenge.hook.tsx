import { FormFields } from "@/ui/admin/screen/challenge/create.screen";
import { SubmitHandler } from "react-hook-form";
import { getResponseError } from "@/api/error/error.api";
import { toast } from "react-toastify";
import { create } from "@/api/admin/challenge/create.api";
import { useNavigate } from "react-router-dom";

export function useCreateChallenge(challengeType: string) {
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
      await create(challengeData);

      toast.success("Challenge created!");
      navigate("/admin/challenges");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
    }
  };

  return onSubmit;
}
