import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/login/login.screen";
import { login } from "@/api/admin/auth/login.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { user } from "@/api/auth/user.api";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { getResponseError } from "@/api/error/error.api";
import { useUserDataContext } from "../../useDataUserContext/useUserDataContext.hook";

export function useLogin() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser } = useAuthContext();
  const { refreshUserData } = useUserDataContext();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const token: string = await login(data);
      localStorage.setItem("token", token);

      const authUser = await user();

      setAuthUser(authUser);
      setIsLoggedIn(true);
      refreshUserData();
      navigate("/admin/dashboard");
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message + ": Verify your credentials and try again.");
      setIsLoggedIn(false);
    }
  };

  return onSubmit;
}
