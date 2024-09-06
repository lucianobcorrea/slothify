import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/login/login.screen";
import { login  } from "@/api/auth/login.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {user} from "@/api/auth/user.api";
import { useAuthContext } from "@/hook/useAuthContext/useAuthContext.hook";

export function useLogin(){
    const navigate = useNavigate();
    const {setIsLoggedIn, setAuthUser} = useAuthContext();

     const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const token: string = await login(data);
            localStorage.setItem('token', token);

            const authUser = await user();
 
            setAuthUser(authUser);
            setIsLoggedIn(true);

            navigate('/home');
        } catch (error:unknown) {
            if(error instanceof Error){
                toast.error(error.message);
            }
            setIsLoggedIn(false);
        }
    }

    return onSubmit;
}