import { SubmitHandler } from "react-hook-form";
import { FormFields } from "@/ui/screen/Register/register.screen";
import { register  } from "@/api/auth/register.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useRegister(){
    const navigate = useNavigate();

     const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await register(data);
            toast.success("Cadastro realizado com sucesso! Agora você pode entrar e iniciar sua jornada.");
            navigate('/login');
        } catch (error: unknown) {
            if(error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return onSubmit;
}