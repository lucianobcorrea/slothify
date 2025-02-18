import { ButtonComponent, InputComponent } from "@/ui/index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useLogin } from "@/hook/admin/useLogin/useLogin.hook";

import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Precisa ser um endereço de email válido." }),
  password: z
    .string()
    .min(8, { message: "A senha precisa ter pelo menos 8 caracteres" }),
});

export type FormFields = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useLogin();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <section
      className="px-8 lg:px-24 min-h-screen flex justify-center items-center bg-zinc-100"
      data-aos="fade-left"
    >
      <div className="shadow-custom-shadow bg-white rounded-3xl h-full w-[50%]">
        <div className="flex flex-col md:flex-row h-full p-8">
          <div className="flex-1 px-4 md:px-14 py-3 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-zinc-800 mb-8">
              Bem vindo! Faça login na sua conta.
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputComponent
                register={{ ...register("email") }}
                labelClassName="text-zinc-800"
                inputClassName="text-black"
                classname={errors.email ? "mb-3" : "mb-6"}
                placeholder="Ex.: joao@feevale.com.br"
                type="email"
                id="email"
              >
                Endereço de email
              </InputComponent>
              {errors.email && (
                <div className="text-red-500 text-sm mb-4">
                  {errors.email.message}
                </div>
              )}
              <InputComponent
                register={{ ...register("password") }}
                labelClassName="text-zinc-800"
                inputClassName="text-black"
                classname={errors.password ? "mb-3" : "mb-2"}
                placeholder="••••••••"
                type="password"
                id="password"
              >
                Senha
              </InputComponent>
              {errors.password && (
                <div className="text-red-500 text-sm">
                  {errors.password.message}
                </div>
              )}
              <ButtonComponent
                btnType="submit"
                disabled={isSubmitting}
                classname="w-full mb-2 bg-primary-color hover:bg-primary-color-dark hover:border-primary-color border-secondary-color mt-10"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </ButtonComponent>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
