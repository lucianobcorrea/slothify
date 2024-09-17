import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/login/login.screen";
import { login } from "@/api/auth/login.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { user } from "@/api/auth/user.api";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";
import { getResponseError } from "@/api/error/error.api";

export function useLogin() {
  const navigate = useNavigate();
  const { setIsLoggedIn, setAuthUser } = useAuthContext();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const token: string = await login(data);
      localStorage.setItem("token", token);

      const authUser = await user();

      setAuthUser(authUser);
      setIsLoggedIn(true);
        console.log(authUser.initialForm);
      if (!authUser.initialForm) {
        navigate("/bem-vindo");
      } else {
        navigate("/home");
      }
    } catch (error) {
      const message = getResponseError(error);
      toast.error(message);
      setIsLoggedIn(false);
    }
  };

  return onSubmit;
}
